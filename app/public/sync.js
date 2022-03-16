const backendUrl = "http://localhost:13032"

let selectedNode;
const $ = jQuery

function getParentPath(path) {
    const i = path.lastIndexOf(path)
    if (i == -1) {
        return ""
    }
    return path.substring(0, path.lastIndexOf("/"))
}

function updateSelectedNode(node) {
    selectedNode = node
    if (!node) {
        $("#new-local-script-button").hide()
        $("#new-script-button").hide()
        $("delete-script-button").hide()
        $("save-script-button").hide()
        return
    }
    if (node.type == "Script" || node.type == "LocalScript") {
        $("#new-local-script-button").hide()
        $("#new-script-button").hide()

        $("#delete-script-button").show()
        $("#save-script-button").show()

        loadBloxScript()
    } else {
        $("#new-local-script-button").show()
        $("#new-script-button").show()

        $("#delete-script-button").hide()
        $("#save-script-button").hide()

        demoWorkspace.clear()
    }
}

function showCode() {
    // Generate Lua code and display it.
    Blockly.Lua.INFINITE_LOOP_TRAP = null;
    var code = Blockly.Lua.workspaceToCode(demoWorkspace);
    console.log(code);
}

async function sendMessage(message) {
    await fetch(`${backendUrl}/messages/studio`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

async function saveScript() {
    // save blox source
    const { path, text } = selectedNode
    const parentPath = getParentPath(path)
    const bloxcodeJson = Blockly.serialization.workspaces.save(demoWorkspace);
    const bloxCode = JSON.stringify(bloxcodeJson)

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
            name: text,
            path: parentPath,
            value: luaCode,
        }
    })
}

async function loadBloxScript() {
    demoWorkspace.clear()
    const { text, path } = selectedNode
    await sendMessage({
        event_type: "GetBloxScript",
        event_data: {
            name: text + ".blox",
            path: getParentPath(path)
        }
    })
}

function onBloxScriptResult(event_data) {
    const codefile = event_data.result
    demoWorkspace.clear()
    
    if (codefile == "") {
        Blockly.serialization.workspaces.load({
            "blocks": {
                "blocks": [],
            },
            "variables": [],
        }, demoWorkspace)
    } else {
        if (codefile.startsWith("<xml")) {
            let codefileDom;
            codefileDom = Blockly.Xml.textToDom(codefile)
            Blockly.Xml.domToWorkspace(codefileDom,
                demoWorkspace);
        } else {
            codefileJson = JSON.parse(codefile)
            Blockly.serialization.workspaces.load(codefileJson, demoWorkspace)
        }
    }
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

async function newLocalScript() {
    var promptBox = simplePopup(2, 'Enter a name for the new LocalScript');
    $.when(promptBox).then(function(scriptName) {
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
    });
}

function newScript() {
    var promptBox = simplePopup(2, 'Enter a name for the new Script');
    $.when(promptBox).then(function(scriptName) {
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
    });
}

function deleteScript() {
    const confirmBox = simplePopup(1, 'Are you sure you want to delete this script?');
    $.when(confirmBox).then(function(res) {
        if (res) {
            const { path, text } = selectedNode
            sendMessage({
                event_type: "DeleteBloxScript",
                event_data: {
                    name: text + ".blox",
                    path: getParentPath(path)
                }
            })
            sendMessage({
                event_type: "DeleteLuaScript",
                event_data: {
                    name: text,
                    path: getParentPath(path)
                }
            })
            demoWorkspace.clear()
            updateSelectedNode(null)
        }
    });
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

function saveLastUpdate(lastUpdate) {
    localStorage.setItem("LAST_UPDATE", JSON.stringify(lastUpdate))
}

function loadLastUpdate() {
    const data = localStorage.getItem("LAST_UPDATE")
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
            case "Tool":
                item.icon = "icons/tool.png"
                break
            case "StarterPack":
                item.icon = "icons/starter-pack.png"
                break
            case "Part":
                item.icon = "icons/part.png"
                break
            case "SpawnLocation":
                item.icon = "icons/spawn-location.png"
                break
            case "Terrain":
                item.icon = "icons/terrain.png"
                break
            case "StarterGui":
                item.icon = "icons/startergui.png"
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
    updateTreeIcons(data.items);
    (function ($) {
        // $('#treeId').jstree(true).settings.core.data = newData;
        $("#browser").jstree(true).settings.core.data = data.items
        $("#browser").jstree("refresh")
    }(jQuery))
}

// custom prompt function for blockly
// needed for electron
Blockly.prompt = function(message, defaultValue, callback) {
    var promptBox = simplePopup(2, message, defaultValue);
    $.when(promptBox).then(function(scriptName) {
        callback(scriptName);
    });
};

async function init() {

    document.getElementById("controls").style = "display: block";
    refresh()

    let i = 0
    let lock = false
    window.setInterval(async () => {
        if (lock) {
            return
        }
        lock = true
        try {
            i = i + 1
            if (i >= 10) {
                i = 0
                sendMessage({
                    event_type: "ping"
                })
            }
            let resp = await fetch(`${backendUrl}/messages/bloxcode`);
            const result = await resp.json()
            console.log(result)
            if (result.messages.length > 0) {
                saveLastUpdate(new Date().getTime())
                console.log("Got a message!", result)
                for (let message of result.messages) {
                    console.log(message);
                    switch (message.event_type) {
                        case "BloxScriptDeleted":
                        case "LuaScriptDeleted":
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
        } finally {
            lock = false
        }

    }, 1000);
}

init()