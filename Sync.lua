local HttpService = game:GetService("HttpService")

local function ends_with(str, ending)
	print("Checking string ending")
	print(str .. ", " .. str:sub(-#ending))
	return ending == "" or str:sub(-#ending) == ending
end

local function is_blox_script(filename)
	return ends_with(filename, ".blox")
end

function ListWorkspace()
	local items = {}
	local children = workspace:GetChildren()
	for i, child: Instance in ipairs(children) do
		items[i] = child.Name
	end
	return {
		items=items
	}
end

function ListGlobalBloxScripts()
	local result = {}
	local script_service = game:GetService("ServerScriptService")
	local children = script_service:GetChildren()
	for _, child: Instance in ipairs(children) do
		if is_blox_script(child.Name) then
			table.insert(result, child.Name)
		end
	end
	return {
		items=result
	}
end

function GetGlobalBloxScript(name: string)
	local result = ""
	if is_blox_script(name) then
		local script_service = game:GetService("ServerScriptService")
		local script = script_service:FindFirstChild(name)
		if script:IsA("StringValue") then
			result = script.Value
		end
	end
	return {
		result=result,
		name=name,
	}
end

function SetGlobalBloxScript(name: string, value: string)
	if is_blox_script(name) then
		print("Setting global blox script " .. name)
		local script_service = game:GetService("ServerScriptService")
		local script = script_service:FindFirstChild(name)
		if not script then
			script = Instance.new("StringValue", script_service)
			script.Name = name
		elseif not script:IsA("StringValue") then
			script:Destroy()
			script = Instance.new("StringValue", script_service)
		end
		script.Value = value
	end
end

function DeleteGlobalBloxScript(name: string)
	if not is_blox_script(name) then
		return
	end
	print("DeleteGlobalBloxScript " .. name)
	local script_service = game:GetService("ServerScriptService")
	local blox_script = script_service:FindFirstChild(name)
	blox_script:Destroy()

	SendMessage("GlobalBloxScriptDeleted", {name=name})
end

function DeleteGlobalLuaScript(name: string)
	if is_blox_script(name) then
		return
	end
	print("DeleteGlobalLuaScript " .. name)
	local script_service = game:GetService("ServerScriptService")
	local lua_script = script_service:FindFirstChild(name)
	lua_script:Destroy()
end

function SetGlobalLuaScript(name: string, value: string)
	if is_blox_script(name) then
		return
	end
	print("Setting global lua script " .. name)
	local script_service = game:GetService("ServerScriptService")
	local script = script_service:FindFirstChild(name)
	if not script then
		script = Instance.new("Script", script_service)
		script.Name = name
	elseif not script:IsA("Script") then
		script:Destroy()
		script = Instance.new("Script", script_service)
		script.Name = name
	end
	script.Source = value
end

function SendMessage(event_type: string, event_data: any)
	HttpService:PostAsync("http://localhost:9080/messages/blox", HttpService:JSONEncode({
		event_type=event_type,
		event_data=event_data,
	}))
end

function killPreviousPlugin()
	local success = false
	pcall(function ()
		HttpService:PostAsync("http://localhost:9080/messages/studio", HttpService:JSONEncode({
			event_type="kill",
		}))
		success = true
	end)
	print(success)
	if not success then
		return success
	end
	
	wait(5)
	-- drain the queue if no previous plugin was running
	local resp = HttpService:GetAsync("http://localhost:9080/messages/studio")
	print(resp)
	return success
end

function Sync()
	print("Sync script starting up")
	local start_time = os.time()
	local running = 1
	while running
	do
		local response
		local data
		pcall(function ()
			response = HttpService:GetAsync("http://localhost:9080/messages/studio")
			data = HttpService:JSONDecode(response)
			for _, message in ipairs(data.messages) do
				print(start_time)
				print(message)
				if message.event_type == "ping" then
					-- print("Responding to ping")
					SendMessage("pong", nil)
				elseif message.event_type == "kill" then
					print("Sync script shutting down")
					running = 0
				elseif message.event_type == "ListWorkspace" then
					-- print("ListWorkspace")
					local resp = ListWorkspace()
					SendMessage("Workspace", resp)
				elseif message.event_type == "ListGlobalBloxScripts" then
					local resp = ListGlobalBloxScripts()
					SendMessage("GlobalBloxScripts", resp)
				elseif message.event_type == "GetGlobalBloxScript" then
					if message.event_data and message.event_data.name then
						local resp = GetGlobalBloxScript(message.event_data.name)
						SendMessage("GlobalBloxScript", resp)
					end
				elseif message.event_type == "SetGlobalBloxScript" then
					if message.event_data and message.event_data.name and message.event_data.value then
						SetGlobalBloxScript(message.event_data.name, message.event_data.value)
					end
				elseif message.event_type == "SetGlobalLuaScript" then
					if message.event_data and message.event_data.name and message.event_data.value then
						SetGlobalLuaScript(message.event_data.name, message.event_data.value)
					end
				elseif message.event_type == "CreateGlobalBloxScript" then
					if message.event_data and message.event_data.name then
						SetGlobalBloxScript(message.event_data.name, "")
						SendMessage("GlobalBloxScriptCreated", {
							name=message.event_data.name
						})
					end
				elseif message.event_type == "DeleteGlobalBloxScript" then
					if message.event_data and message.event_data.name then
						DeleteGlobalBloxScript(message.event_data.name)
					end
				elseif message.event_type == "DeleteGlobalLuaScript" then
					if message.event_data and message.event_data.name then
						DeleteGlobalLuaScript(message.event_data.name)
					end
				end
			end
		end)
		wait(1)
	end
end

if killPreviousPlugin() then
	spawn(Sync)
end
