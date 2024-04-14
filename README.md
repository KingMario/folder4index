# Folder4Index VSCode Extension

This extension is a handy tool for managing JavaScript, TypeScript, JSX, and TSX files named index.js, index.ts, index.jsx, or index.tsx in Visual Studio Code.

## Features

### File Rename Command

The Folder4Index extension offers a rename command that allows you to rename a selected index.js, index.ts, index.jsx, or index.tsx file to match its directory's name while maintaining the same extension. For instance, a file located at src/components/Button/index.js can be renamed to src/components/Button.js using this command.

### File Name Display

When you switch to an active text editor handling a file named index.js, index.ts, index.jsx, or index.tsx, the extension will display a helpful message. This message includes the directory name of the file, followed by /index.js, /index.ts, /index.jsx, or /index.tsx. Moreover, it provides an option to rename it as the File Rename Command does.

## Usage

### File Rename Command

To use the `Rename Index File` command, follow these steps:

1. Right-click on a file named `index.js`, `index.ts`, `index.jsx`, or `index.tsx` in the VSCode file explorer.
2. In the context menu, find the `Rename Index File` option and click on it.
3. Your file will now bear the name of the folder it was in.

### File Name Display

Simply switch to a file named index.js, index.ts, index.jsx, or index.tsx and an information message will appear, displaying the file's directory name followed by /index.js, /index.ts, /index.jsx, or /index.tsx. Additionally, a `Rename` button is available for you to rename the file directly.

## Installation

To install the extension, search for Folder4Index in the VSCode Extensions Marketplace and click Install.

## Deactivation

You can deactivate the extension by disabling it in the VSCode Extensions Marketplace.

## Supported File Types

The extension currently supports the following file types:

- JavaScript (.js)
- TypeScript (.ts)
- JavaScript React (.jsx)
- TypeScript React (.tsx)

## Contribution

We welcome contributions. Please submit a pull request on the GitHub repository.

## License

MIT
