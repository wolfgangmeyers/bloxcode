local HttpService = game:GetService("HttpService")
local backend_url = "http://localhost:13032"

local function ends_with(str, ending)
	print("Checking string ending")
	print(str .. ", " .. str:sub(-#ending))
	return ending == "" or str:sub(-#ending) == ending
end

local function is_blox_script(filename)
	return ends_with(filename, ".blox")
end

local max_depth = 2

function RecursiveListEverything(children: Array, instance: Instance, depth: number, path: string)
	if depth > max_depth then
		return
	end
	for _, child: Instance in ipairs(instance:GetChildren()) do
		if child.ClassName == "StringValue" then
			continue
		end
		if depth == max_depth and child.ClassName ~= "Script" and child.ClassName ~= "LocalScript" then
			continue
		end
		local child_node = {
			text=child.Name,
			type=child.ClassName,
			path=path .. "/" .. child.Name
		}
		local grand_children = child:GetChildren()
		if #grand_children > 0 then
			child_node.children = {}
			RecursiveListEverything(child_node.children, child, depth + 1, path .. "/" .. child.Name)
		end
		table.insert(children, child_node)
	end
end

function ListEverything()
	local everything = {}
	local workspace_children = {}
	RecursiveListEverything(workspace_children, game.Workspace, 1, "Workspace")
	table.insert(everything, {
		text="Workspace",
		type=game.Workspace.ClassName,
		children=workspace_children,
		path="Workspace"
	})

	local starter_player_children = {}
	local starter_player = game:GetService("StarterPlayer")
	RecursiveListEverything(starter_player_children, starter_player, 1, "StarterPlayer")
	table.insert(everything, {
		text="StarterPlayer",
		type=starter_player.ClassName,
		children=starter_player_children,
		path="StarterPlayer"
	})

	local starter_pack_children = {}
	local starter_pack = game:GetService("StarterPack")
	RecursiveListEverything(starter_pack_children, starter_pack, 1, "StarterPack")
	table.insert(everything, {
		text="StarterPack",
		type=starter_pack.ClassName,
		children=starter_pack_children,
		path="StarterPack"
	})

	local server_storage = game:GetService("ServerStorage")
	local server_storage_children = {}
	RecursiveListEverything(server_storage_children, server_storage, 1, "ServerStorage")
	table.insert(everything, {
		text="ServerStorage",
		type=server_storage.ClassName,
		children=server_storage_children,
		path="ServerStorage"
	})

	local server_script_service = game:GetService("ServerScriptService")
	local server_script_service_children = {}
	RecursiveListEverything(server_script_service_children, server_script_service, 1, "ServerScriptService")
	table.insert(everything, {
		text="ServerScriptService",
		type=server_script_service.ClassName,
		children=server_script_service_children,
		path="ServerScriptService"
	})

	return {
		items=everything
	}
end

function PopPath(path: string): (string, string)
	local i = path:find("/")
	if not i then
		return path, ""
	end
	return path:sub(0, i - 1), path:sub(i + 1)
end

function RecursiveFindInstance(path: string, instance: Instance): Instance
	if path == "" then
		return instance
	end
	local child_name, child_path = PopPath(path)
	local child = instance:FindFirstChild(child_name)
	if child then
		return RecursiveFindInstance(child_path, child)
	end
end

function FindInstance(path: string): Instance
	local root_container, sub_path = PopPath(path)
	if root_container == "Workspace" then
		return RecursiveFindInstance(sub_path, game.Workspace)
	else
		local service = game:GetService(root_container)
		return RecursiveFindInstance(sub_path, service)
	end
end

function SaveBloxScript(name: string, value: string, path: string)
	print("SaveBloxScript: " .. name .. ", " .. value .. ", " .. path)
	if is_blox_script(name) then
		local container = FindInstance(path)
		local script = container:FindFirstChild(name)
		if not script then
			script = Instance.new("StringValue", container)
			script.Name = name
		elseif not script:IsA("StringValue") then
			script:Destroy()
			script = Instance.new("StringValue", container)
		end
		script.Value = value
	end
end

function SaveLocalScript(name: string, value: string, path: string)
	if not is_blox_script(name) then
		local container = FindInstance(path)
		local script = container:FindFirstChild(name)
		if not script then
			script = Instance.new("LocalScript", container)
			script.Name = name
			SendMessage("bloxcode", "LocalScriptCreated", {
				name=name,
				path=path
			})
		elseif not script:IsA("LocalScript") then
			script:Destroy()
			script = Instance.new("LocalScript", container)
			script.Name = name
			SendMessage("bloxcode", "LocalScriptCreated", {
				name=name,
				path=path
			})
		end
		script.Source = value
	end
end

function SaveScript(name: string, value: string, path: string)
	if not is_blox_script(name) then
		local container = FindInstance(path)
		local script = container:FindFirstChild(name)
		if not script then
			script = Instance.new("Script", container)
			script.Name = name
			SendMessage("bloxcode", "ScriptCreated", {
				name=name,
				path=path
			})
		elseif not script:IsA("Script") then
			script:Destroy()
			script = Instance.new("Script", container)
			script.Name = name
			SendMessage("bloxcode", "ScriptCreated", {
				name=name,
				path=path
			})
		end
		script.Source = value
	end
end

function GetBloxScript(name: string, path: string)
	local result = ""
	if is_blox_script(name) then
		local container = FindInstance(path)
		local script = container:FindFirstChild(name)
		if script:IsA("StringValue") then
			result = script.Value
		end
	end
	return {
		result=result,
		name=name,
		path=path
	}
end

function DeleteBloxScript(name: string, path: string)
	if not is_blox_script(name) then
		return
	end
	local container = FindInstance(path)
	local blox_script = container:FindFirstChild(name)
	blox_script:Destroy()
	SendMessage("bloxcode", "BloxScriptDeleted", {name=name, path=path})
end

function DeleteLuaScript(name: string, path: string)
	if is_blox_script(name) then
		return
	end
	local container = FindInstance(path)
	local lua_script = container:FindFirstChild(name)
	lua_script:Destroy()
	SendMessage("bloxcode", "LuaScriptDeleted", {name=name, path=path})
end

function SendMessage(queueName: string, event_type: string, event_data: any)
	local url = backend_url .. "/messages/" .. queueName
	HttpService:PostAsync(url, HttpService:JSONEncode({
		event_type=event_type,
		event_data=event_data,
	}), "ApplicationJson", false)
end

function GetMessages(queueName: string)
	local url = backend_url .. "/messages/" .. queueName
	local response = HttpService:GetAsync(url, false)
	print("GetMessages: " .. response)
	return HttpService:JSONDecode(response)
end

function killPreviousPlugin()
	local lastBloxUpdate = GetLastBloxUpdate()
	if os.time() - lastBloxUpdate > 50 then
		return true
	end
	local success = false
	pcall(function ()
		SendMessage("studio","kill")
		success = true
	end)
	if not success then
		return success
	end

	wait(5)
	-- drain the queue if no previous plugin was running
	local resp = GetMessages("studio")
	print(resp)
	return success
end

function GetLastBloxUpdate()
	local serverStorage = game:GetService("ReplicatedStorage")
	local lastUpdateValue: NumberValue = serverStorage:FindFirstChild("lastBloxUpdate")
	if lastUpdateValue == nil then
		return 0
	end
	return lastUpdateValue.Value
end

-- accepts optional number
function SaveLastBloxUpdate(time: number)
	local replicatedStorage = game:GetService("ReplicatedStorage")
	local lastUpdateValue: NumberValue = replicatedStorage:FindFirstChild("lastBloxUpdate")
	if lastUpdateValue == nil then
		lastUpdateValue = Instance.new("NumberValue", replicatedStorage)
		lastUpdateValue.Name = "lastBloxUpdate"
	end
	if time == nil then
		time = os.time()
	end
	lastUpdateValue.Value = time
end

function ClearLastBloxUpdate()
	local replicatedStorage = game:GetService("ReplicatedStorage")
	local lastUpdateValue: NumberValue = replicatedStorage:FindFirstChild("lastBloxUpdate")
	if lastUpdateValue == nil then
		lastUpdateValue = Instance.new("NumberValue", replicatedStorage)
		lastUpdateValue.Name = "lastBloxUpdate"
	end
	lastUpdateValue.Value = 0
end

function SetupGui()
	local starterGui = game:GetService("StarterGui")
	local screen = starterGui:FindFirstChild("screen")
	if screen ~= nil then
		screen:Destroy()
	end
	screen = Instance.new("ScreenGui", starterGui)
	screen.Name = "screen"
	local label = Instance.new("TextLabel", screen)
	label.Name = "prompt"
	label.Text = ""
	label.Visible = true
	label.Position = UDim2.new(0.8, 0, 0.85, 0)
	label.Size = UDim2.new(0.1, 0, 0.1, 0)
	label.BackgroundTransparency = 1
	label.TextColor3 = Color3.new(1, 1, 1)
	label.TextSize = 14

	-- Show prompt when connection info is present and last update is 0
	local replicatedStorage = game:GetService("ReplicatedStorage")
	local lastUpdateValue: NumberValue = replicatedStorage:FindFirstChild("lastBloxUpdate")
	if lastUpdateValue == nil then
		lastUpdateValue = Instance.new("NumberValue", replicatedStorage)
		lastUpdateValue.Name = "lastBloxUpdate"
	end

	local function UpdatePrompt()
		print("Updating connected state")
		if os.time() - lastUpdateValue.Value > 10 then
			label.Text = "Bloxcode Disconnected"
		else
			label.Text = "Bloxcode Connected"
		end
	end
	UpdatePrompt()

	lastUpdateValue.Changed:Connect(UpdatePrompt)

	print("GUI updated")
end

function Sync()
	print("Sync script starting up")

	-- If we are starting back up after starting or stopping test,
	-- we can reuse the connection info. Check last update time from
	-- bloxcode studio to see if a new connection should be made.
	print("Get connection info")
	local lastBloxUpdate = GetLastBloxUpdate()
	print(lastBloxUpdate)

	local running = 1
	while running
	do
		-- local response
		local data
		local success, err = pcall(function ()
			data = GetMessages("studio")
			for _, message in ipairs(data.messages) do
				SaveLastBloxUpdate(os.time())
				local success, err = pcall(function()
					-- print(start_time)
					print(message.event_type)
					if message.event_type == "ping" then
						-- print("Responding to ping")
						SendMessage("bloxcode", "pong", nil)
					elseif message.event_type == "kill" then
						print("Sync script shutting down")
						running = 0
					elseif message.event_type == "GetBloxScript" then
						if message.event_data and message.event_data.name and message.event_data.path then
							local resp = GetBloxScript(message.event_data.name, message.event_data.path)
							SendMessage("bloxcode", "BloxScriptResult", resp)
						end
					elseif message.event_type == "SaveBloxScript" then
						print(message)
						if message.event_data and message.event_data.name and message.event_data.value and message.event_data.path then
							SaveBloxScript(message.event_data.name, message.event_data.value, message.event_data.path)
						end
					elseif message.event_type == "SaveScript" then
						if message.event_data and message.event_data.name and message.event_data.path then
							SaveScript(message.event_data.name, message.event_data.value or "", message.event_data.path)
						end
					elseif message.event_type == "SaveLocalScript" then
						if message.event_data and message.event_data.name and message.event_data.path then
							SaveLocalScript(message.event_data.name, message.event_data.value or "", message.event_data.path)
						end
					elseif message.event_type == "DeleteBloxScript" then
						if message.event_data and message.event_data.name and message.event_data.path then
							DeleteBloxScript(message.event_data.name, message.event_data.path)
						end
					elseif message.event_type == "DeleteLuaScript" then
						if message.event_data and message.event_data.name and message.event_data.path then
							DeleteLuaScript(message.event_data.name, message.event_data.path)
						end
					elseif message.event_type == "ListEverything" then
						local result = ListEverything()
						SendMessage("bloxcode", "ListEverythingResult", result)
					end
				end)
				if not success then
					print(err)
				end
			end
		end)
		if not success then
			print(err)
			SaveLastBloxUpdate(0)
		end
		wait(1)
	end
end

if killPreviousPlugin() then
	spawn(Sync)
	SetupGui()
end
