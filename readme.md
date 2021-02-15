# Bloxcode

Welcome to Bloxcode!

This project aims to enable people to implement roblox scripts using
visual programming blocks provided by [Blockly](https://developers.google.com/blockly).

## Why does this project exist?

Because while googling for a way to use a scratch-type visual programming interface to
implement roblox scripts, I didn't really find anything, although others had gone looking
for the same thing before me.

## How does it work?
Bloxcode is made up of three components:

* A Roblox Studio plugin that manages scripts
* A web site that exposes a Blockly interface where a user can write scripts
* A backend service that allows the other two components to communicate

### Roblox studio plugin

The [Sync.lua](./Sync.lua) script, once installed as a plugin, will prompt the user
to open up www.bloxcode.studio and enter a code. Once the code is entered into the website
and it establishes communication with the plugin, the popup will disappear and scripts
can be managed from the Bloxcode UI. If the connection fails for some reason, the plugin
will prompt the user again with a new code to connect.

### Bloxcode website

The Bloxcode website hosted at https://www.bloxcode.studio provides a Blockly interface
for editing scripts. Currently the website has a **very basic** interface that will be
updated to be more user-friendly in the future.

## Creating a new script

From the [Bloxcode website](https://www.bloxcode.studio) click on "New Blox Script", then
enter the name of the script in the prompt. This will create two children in the ServerScriptService:
* A bloxcode source file with a `.blox` extension. This is where the blocks are saved
* A lua server script. This is generated whenever the bloxcode file is saved from the website.

## Edit an existing script

Once connected to roblox studio, select existing scripts from the dropdown to the left.
After a second or two the Bloxcode script should load.
