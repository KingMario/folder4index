# Folder For Index VSCode Extension

This extension is a handy tool for managing JavaScript, TypeScript, JSX, and TSX files in Visual Studio Code.

## Features

### File Rename Command

The `Folder For Index` extension offers a rename command that allows you to rename a selected `index.js`, `index.ts`, `index.jsx`, or `index.tsx` file to use its parent folder's name while keeping the same extension. For instance, file `src/components/Button/index.jsx` can be renamed to `src/components/Button.jsx` using this command.

Vice versa, it also provides a rename command to rename a file of normal filename to an index file under the folder named after the file. For instance, file `src/components/Button.jsx` can be renamed to `src/components/Button/index.jsx` using this command.

### ~~File Name Display~~

When you switch to an active text editor handling a file named `index.js`, `index.ts`, `index.jsx`, or `index.tsx`, the extension will display a message for you to distinguish it from other index files. This message includes the folder name of the file, followed by `/` and its filename. Moreover, it provides an option to rename it as the File Rename Command does.

_In the meantime, Visual Studio Code has released settings to customize editor tab labels. Search settings for `workbench.editor.customLabels`, then set `Enabled` to `true` and add a `pattern` with value `"**/index.{js,ts,jsx,tsx}": "${dirname}/${filename}.${extname}"`. It can help you to distinguish index files of different folders._

_This `File Name Display` function is to be removed in next release._

## Usage

### File Rename Command

To use the `Rename Index File` command, follow these steps:

1. Right-click on a file with extension `.js`, `.ts`, `.jsx`, or `.tsx` in the VSCode file explorer.
2. In the context menu, find the `Rename Index File` option and click on it.
3. Your file will now be renamed.
4. If prompted to update imports, please select `Yes` or `Always`.

### ~~File Name Display~~

Simply switch to a file named `index.js`, `index.ts`, `index.jsx`, or `index.tsx` and an information message will appear, displaying the file's parent folder name followed by `/` and its filename. Additionally, a `Rename` button is available for you to rename the file directly.

## Installation

To install the extension, search for `Folder For Index` in the VSCode Extensions Marketplace and click Install.

## Deactivation

You can deactivate the extension by disabling it in the VSCode Extensions panel.

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
