const backendUrl = "https://7iokpqos42.execute-api.us-west-2.amazonaws.com/prod"

let connectionInfo;
let selectedNode;

function getParentPath(path) {
    const i = path.lastIndexOf(path)
    if (i == -1) {
        return ""
    }
    return path.substring(0, path.lastIndexOf("/"))
}

function updateSelectedNode(node) {
    selectedNode = node
    console.log(node.path)

    if (node.type == "Script" || node.type == "LocalScript") {
        document.getElementById("new-local-script-button").setAttribute("disabled", "disabled")
        document.getElementById("new-script-button").setAttribute("disabled", "disabled")

        document.getElementById("delete-script-button").removeAttribute("disabled")
        document.getElementById("save-script-button").removeAttribute("disabled")

        loadBloxScript()
    } else {
        document.getElementById("new-local-script-button").removeAttribute("disabled")
        document.getElementById("new-script-button").removeAttribute("disabled")

        document.getElementById("delete-script-button").setAttribute("disabled", "disabled")
        document.getElementById("save-script-button").setAttribute("disabled", "disabled")

        demoWorkspace.clear()
    }
    // TODO: if script selected..
    // TODO: if non-script selected
}

function showCode() {
    // Generate Lua code and display it.
    Blockly.Lua.INFINITE_LOOP_TRAP = null;
    var code = Blockly.Lua.workspaceToCode(demoWorkspace);
    alert(code);
}

async function sendMessage(message) {
    await fetch(`${backendUrl}/messages/${connectionInfo.queues.studio}`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            authcode: connectionInfo.auth_code
        }
    })
}

async function saveScript() {
    // save blox source
    // const codefile_select = document.getElementById("codefile")
    // const codefile = codefile_select.value
    const {path, text} = selectedNode
    const parentPath = getParentPath(path)
    const bloxCodeDom = Blockly.Xml.workspaceToDom(demoWorkspace)
    const bloxCode = Blockly.Xml.domToText(bloxCodeDom)
    await sendMessage({
            event_type: "SaveBloxScript",
            event_data: {
                name: text + ".blox",
                path: parentPath,
                value: bloxCode
            }
        })
    // save Lua source
    Blockly.Lua.INFINITE_LOOP_TRAP = null;
    const luaCode = Blockly.Lua.workspaceToCode(demoWorkspace)
    await sendMessage({
        event_type: selectedNode.type == "LocalScript" ? "SaveLocalScript" : "SaveScript",
        event_data: {
            name,
            path: parentPath,
            value: luaCode,
        }
    })
}

async function loadBloxScript() {
    demoWorkspace.clear()
    const {text, path} = selectedNode
    await sendMessage({
        event_type: "GetBloxScript",
        event_data: {
            name: text + ".blox",
            path: getParentPath(path)
        }
    })
}

function onBloxScriptResult(event_data) {
    const codefileXml = event_data.result
    demoWorkspace.clear()
    let codefileDom;
    if (codefileXml == "") {
        codefileDom = Blockly.Xml.textToDom(`<xml xmlns="https://developers.google.com/blockly/xml"></xml>`)
    } else {
        codefileDom = Blockly.Xml.textToDom(codefileXml)
    }
    Blockly.Xml.domToWorkspace(codefileDom,
        demoWorkspace);
}

async function refresh() {
    await sendMessage({
        event_type: "ListEverything"
    })
}


function onRefresh(event_data) {
    const codefile_select = document.getElementById("codefile")
    let options = `<option value="">Select a file</option>`
    for (let item of event_data.items) {
        options += `<option value="${item}">${item}</option>`
    }
    codefile_select.innerHTML = options
}

function newLocalScript() {
    const scriptName = prompt("Enter a name for the new LocalScript")
    if (scriptName) {
        sendMessage({
            event_type: "SaveLocalScript",
            event_data: {
                name: scriptName,
                value: "",
                path: selectedNode.path
            }
        })
    }
}

function newScript() {
    const scriptName = prompt("Enter a name for the new Script")
    if (scriptName) {
        sendMessage({
            event_type: "SaveScript",
            event_data: {
                name: scriptName,
                value: "",
                path: selectedNode.path
            }
        })
    }
}

function deleteBloxScript() {
    if (!confirm("Are you sure you want to delete this blox code file?")) {
        return
    }
    const codefile_select = document.getElementById("codefile")
    sendMessage({
        event_type: "DeleteBloxScript",
        event_data: {
            name: codefile_select.value
        }
    })
    const luafile = codefile_select.value.split(".blox")[0]
    sendMessage({
        event_type: "DeleteGlobalLuaScript",
        event_data: {
            name: luafile
        }
    })
}

function onBloxScriptCreated(event_data) {
    const codefile_select = document.getElementById("codefile")
    const name = event_data.name
    codefile_select.innerHTML += `<option value="${name}">${name}</option>`
    codefile_select.value = name
    demoWorkspace.clear()
    saveToRoblox()
}

function onBloxScriptDeleted(event_data) {
    refresh()
}

async function getConnectionInfo(code) {
    const resp = await fetch(backendUrl + "/codes/" + code)
    return await resp.json()
}

function saveLastUpdate(lastUpdate) {
    localStorage.setItem("LAST_UPDATE", JSON.stringify(lastUpdate))
}

function loadLastUpdate() {
    const data = localStorage.getItem("LAST_UPDATE")
    if (data) {
        return JSON.parse(data)
    }
}

function saveConnectionInfo(info) {
    localStorage.setItem("CONNECTION_INFO", JSON.stringify(info))
}

function loadConnectionInfo() {
    const lastUpdate = loadLastUpdate()
    if (!lastUpdate) {
        return
    }
    const now = new Date().getTime()
    if (now - lastUpdate > 20 * 1000) {
        return
    }
    let data = localStorage.getItem("CONNECTION_INFO")
    if (data) {
        return JSON.parse(data)
    }
}

function updateTreeIcons(items) {
    for (let item of items) {
        switch (item.type) {
            case "StarterPlayerScripts":
            case "StarterCharacterScripts":
                item.icon = "/icons/player-scripts.png"
                break
            case "Folder":
                item.icon = "/icons/folder.png"
                break
            case "StarterPlayer":
                item.icon = "/icons/starter-player.png"
                break
            case "Workspace":
                item.icon = "/icons/workspace.png"
                break
            case "Script":
                item.icon = "icons/script.png"
                break
            case "LocalScript":
                item.icon = "icons/localscript.png"
                break
            case "ServerStorage":
                item.icon = "icons/server-storage.png"
                break
            case "ServerScriptService":
                item.icon = "icons/server-script-service.png"
                break
            case "Camera":
                item.icon = "icons/camera.png"
                break
            default:
                item.icon = "/icons/model.png"
                break
        }
        if (item.children) {
            updateTreeIcons(item.children)
        }
    }
}

function updateTreeview(data) {
    updateTreeIcons(data.items)
    (function($) {
        // $('#treeId').jstree(true).settings.core.data = newData;
        $("#browser").jstree(true).settings.core.data = data.items
        $("#browser").jstree("refresh")
    }(jQuery))
}

async function onConnect(info) {
    if (info) {
        connectionInfo = info
    } else {
        let btnConnect = document.getElementById("connect");
        btnConnect.innerHTML = "connecting..."
        btnConnect.enabled = false
        let code = document.getElementById("code").value
        
        try {
            connectionInfo = await getConnectionInfo(code)
            btnConnect.innerHTML = "Connect to Roblox Studio"
            btnConnect.enabled = true
        } catch (err) {
            btnConnect.innerHTML = "Connect to Roblox Studio"
            btnConnect.enabled = true
            console.error(err)
            return
        }
        saveConnectionInfo(connectionInfo)
    }
   


    document.getElementById("controls").style = "display: block";
    document.getElementById("connect_container").style = "display: none"
    refresh()

    let i = 0
    window.setInterval(async() => {
        i = i + 1
        if (i >= 10) {
            i = 0
            sendMessage({
                event_type: "ping"
            })
        }
        // TODO: figure out how to pass authcode
        let resp = await fetch(`${backendUrl}/messages/${connectionInfo.queues.blox}`, {
            headers: {
                authcode: connectionInfo.auth_code
            }
        });
        const result = await resp.json()
        console.log(result)
        if (result.messages.length > 0) {
            saveLastUpdate(new Date().getTime())
            console.log("Got a message!", result)
            for (let message of result.messages) {
                console.log(message);
                switch (message.event_type) {
                    case "BloxScriptDeleted":
                        onBloxScriptDeleted(message.event_data);
                        break;
                    case "BloxScriptResult":
                        onBloxScriptResult(message.event_data)
                        break
                    case "ListEverythingResult":
                        updateTreeview(message.event_data)
                        break
                    case "LocalScriptCreated":
                    case "ScriptCreated":
                        refresh()
                        break
                }
            }
        }
    }, 1000);
}

let info = loadConnectionInfo()
if (info) {
    onConnect(info)
}

document.getElementById("connect").addEventListener("click", onConnect)