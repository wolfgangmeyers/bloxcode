const backendUrl = "https://7iokpqos42.execute-api.us-west-2.amazonaws.com/prod"

let connectionInfo;

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

async function saveToRoblox() {
    // save blox source
    const codefile_select = document.getElementById("codefile")
    const codefile = codefile_select.value
    const bloxCodeDom = Blockly.Xml.workspaceToDom(demoWorkspace)
    const bloxCode = Blockly.Xml.domToText(bloxCodeDom)
    await sendMessage({
            event_type: "SetGlobalBloxScript",
            event_data: {
                name: codefile,
                value: bloxCode
            }
        })
        // save Lua source
    const luafile = codefile.split(".blox")[0]
    Blockly.Lua.INFINITE_LOOP_TRAP = null;
    const luaCode = Blockly.Lua.workspaceToCode(demoWorkspace)
    await sendMessage({
        event_type: "SetGlobalLuaScript",
        event_data: {
            name: luafile,
            value: luaCode,
        }
    })
}

async function loadCodefile(codefile) {
    await sendMessage({
        event_type: "GetGlobalBloxScript",
        event_data: {
            name: codefile
        }
    })
}

async function onCodefileChanged() {
    const codefile_select = document.getElementById("codefile")
    const codefile = codefile_select.value
    console.log(`codefile changed: ${codefile}`)
    if (codefile) {
        await loadCodefile(codefile)
    }
}

function onCodefileReturned(event_data) {
    // TODO: ensure this is the right file by checking name
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
        event_type: "ListGlobalBloxScripts"
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

function newBloxScript() {
    const filename = prompt("Enter a name for the new blox script")
    if (filename) {
        sendMessage({
            event_type: "CreateGlobalBloxScript",
            event_data: {
                name: filename + ".blox"
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
        event_type: "DeleteGlobalBloxScript",
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



async function onConnect() {
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
            console.log("Got a message!", result)
            for (let message of result.messages) {
                console.log(message);
                switch (message.event_type) {
                    case "GlobalBloxScriptDeleted":
                        onBloxScriptDeleted(message.event_data);
                        break;
                    case "GlobalBloxScripts":
                        onRefresh(message.event_data)
                        break
                    case "GlobalBloxScriptCreated":
                        onBloxScriptCreated(message.event_data);
                        break;
                    case "GlobalBloxScript":
                        onCodefileReturned(message.event_data)
                        break
                }
            }
        }
    }, 1000);

}

document.getElementById("connect").addEventListener("click", onConnect)