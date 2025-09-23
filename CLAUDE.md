# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bloxcode is a visual programming environment for creating Roblox scripts using Blockly. It consists of:
- An Electron desktop application that provides the Blockly interface
- A Roblox Studio plugin that syncs scripts between Studio and Bloxcode
- A messaging server that enables communication between the two components

## Common Development Commands

### Electron App (in `/app` directory)
```bash
cd app
npm install              # Install dependencies
npm start                # Run the Electron app in development mode
npm run package          # Package the application
npm run make             # Create distributable packages
```

## Architecture

### Two-Component System
1. **Desktop Application** (`/app`): Electron app running on port 13032
   - `main.js`: Electron main process, creates browser window and starts the server
   - `server.js`: Express server handling message passing between Bloxcode and Roblox Studio
   - `public/blocks.js`: Blockly block definitions and Lua code generators
   - `public/renderer.js`: Frontend logic for the Blockly interface
   - `public/sync.js`: Client-side sync logic

2. **Roblox Studio Plugin** (`Sync.lua`): Manages script synchronization
   - Lists all scripts in the Roblox project
   - Syncs .blox source files with generated Lua scripts
   - Communicates with desktop app via HTTP messages

### Message Flow
The Express server (`server.js`) maintains two message queues:
- `/messages/bloxcode`: Messages from Studio to Bloxcode
- `/messages/studio`: Messages from Bloxcode to Studio

Messages expire after 10 seconds and queues are cleared after 100 messages to prevent memory issues.

### Block Development
New Roblox API blocks are defined in `/app/public/blocks.js` with:
- Block definition (visual appearance and inputs)
- Lua generator (converts block to Lua code)

Example block structure can be found throughout `blocks.js` - each block needs both a `Blockly.Blocks` definition and a `Blockly.Lua` generator.

## Key Files for Block Development
- `/app/public/blocks.js`: All block definitions and Lua generators
- `/app/public/toolbox.js`: Toolbox categories and block organization
- `/app/public/index.html`: Main application UI

## Plugin Installation
The Roblox Studio plugin is not yet published. Manual installation:
1. Create a Script in ServerStorage
2. Paste contents of `Sync.lua`
3. Save as local plugin

## Release Process

### Creating a New Release

1. **Build the executable**
   ```bash
   cd app
   npm run make
   ```
   This creates the installer at `app/out/make/squirrel.windows/x64/bloxcode-1.0.0 Setup.exe`

2. **Create and push a git tag**
   Follow the naming convention: `vYYYY-MM-DD-alpha`
   ```bash
   git tag v2025-09-23-alpha
   git push origin v2025-09-23-alpha
   ```

3. **Create GitHub release**
   ```bash
   gh release create v2025-09-23-alpha \
     "app/out/make/squirrel.windows/x64/bloxcode-1.0.0 Setup.exe" \
     --prerelease \
     --title "v2025-09-23-alpha" \
     --notes "## What's Changed
   - Feature 1
   - Feature 2

   ## Installation
   Download and run \`bloxcode-1.0.0 Setup.exe\` to install or update Bloxcode on Windows."
   ```

4. **Verify release**
   Check the release URL to ensure the installer was uploaded correctly

### Release Notes Guidelines
- List all new features and blocks added
- Mention any bug fixes or improvements
- Include installation instructions
- Keep it concise and user-friendly