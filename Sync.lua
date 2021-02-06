local HttpService = game:GetService("HttpService")

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

function SendMessage(event_type: string, event_data: any)
	HttpService:PostAsync("http://localhost:9080/messages/blox", HttpService:JSONEncode({
		event_type=event_type,
		event_data=event_data,
	}))
end

function Sync()
	print(workspace:FindFirstChild("ServerScriptService"))
	while 1
	do
		local response
		local data
		pcall(function ()
			response = HttpService:GetAsync("http://localhost:9080/messages/studio")
			data = HttpService:JSONDecode(response)
			for _, message in ipairs(data.messages) do
				print(message)
				if message.event_type == "ping" then
					-- print("Responding to ping")
					SendMessage("pong", nil)
				elseif message.event_type == "ListWorkspace" then
					-- print("ListWorkspace")
					local resp = ListWorkspace()
					SendMessage("Workspace", resp)
				end
			end
		end)
		wait(1)
	end
end

spawn(Sync)
