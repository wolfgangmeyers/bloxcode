![Bloxcode](https://www.bloxcode.studio/bloxcode-logo-truncated.png)

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

Installation:

Eventually this will be published as an official plugin. Until then, you can install
the plugin into Roblox Studio manually:

* Create a new server Script in ServerStorage
* Paste the contents of [Sync.lua](./docs/Sync.lua) into the script
* Right click the script and select Save Local Plugin

Once the plugin is active, you should be prompted to navigate to www.bloxcode.studio with
a code to enter in the website.

Removal:

Navigate to the Plugins tab in Roblox Studio and click on the Plugins Folder. Delete the
script that was saved earlier and restart Roblox Studio.


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

## Limitations

* Only server scripts are supported, no local scripts
* All scripts are saved in ServerStorageService
* Only a tiny subset of the roblox api is currently implemented

## Can I help make Bloxcode better?

Yes, please! If there are any features you would like to see implemented, or any bugs you
find, head over to the [github issues](https://github.com/wolfgangmeyers/bloxcode/issues) list for the project and see if someone has already filed an issue. If you find someone
has already filed an issue, add a thumbs-up to the issue to upvote. If not, please file
an issue and include details on what you would like changed.

Help is also wanted in implementing new blocks that expose the Roblox API. If you would
like to help with adding new blocks, check out the existing [block definitions](./docs/blocks.js) and [toolbox definition](./docs/index.html). The general workflow for
implementing a new block:

* Fork your own version of this repository
* Define a new block using [Block Factory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) (TODO: add a guide on how to use this)
* Copy over the block definition (javascript) and Lua generator stub into the [block definitions file](./docs/blocks.js).
* Add the lua code to the generator stub
* Test out your changes locally (TODO: add a guide on how to do this)
* Submit a pull request


