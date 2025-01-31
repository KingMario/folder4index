# Index File Manager VSCode Extension

This extension is a handy tool for managing `index` files in JavaScript, TypeScript, JSX, and TSX projects in Visual Studio Code.

## Why the Name Change?

Originally, this extension was named `Folder For Index` because its primary purpose was to display the folder information of the index file in the notification to avoid confusion when multiple index files were opened. However, with the availability of the `workbench.editor.customLabels` setting in VS Code, which allows displaying the folder name in the editor label, this feature became redundant. Consequently, the feature was removed, and new functionalities described below were added. To better reflect these new functionalities, the extension was renamed to `Index File Manager`.

## Features

### File Rename Command

The `Index File Manager` extension offers a rename command that allows you to rename a selected `index.js`, `index.ts`, `index.jsx`, or `index.tsx` file to use its parent folder's name while keeping the same extension. For instance, file `src/components/Button/index.jsx` can be renamed to `src/components/Button.jsx` using this command.

Vice versa, it also provides a rename command to rename a file of normal filename to an index file under the folder named after the file. For instance, file `src/components/Button.jsx` can be renamed to `src/components/Button/index.jsx` using this command.

### Create Index File Command

The `Index File Manager` extension provides a command to create an `index` file in a specified folder. This command scans the folder for JavaScript, TypeScript, JSX, and TSX files and generates an `index` file that exports all the members(*) from all the found files.

## Usage

### Rename File

To use the `Rename Index File` command, follow these steps:

1. Right-click on a file with extension `.js`, `.ts`, `.jsx`, or `.tsx` in the VSCode file explorer.
2. In the context menu, find the `Rename Index File` option and click on it.
3. Your file will now be renamed.
4. If prompted to update imports, please select `Yes` or `Always`.

### Create Index File

1. Right-click on a folder in the VSCode file explorer.
2. In the context menu, find the `Create Index File` option and click on it.
3. Select the desired file extension for the `index` file (`.js`, `.ts`, `.jsx`, or `.tsx`).
4. The extension will create an `index` file in the selected folder, exporting all members from all the JavaScript, TypeScript, JSX, and TSX files found in that folder.

Note: If an index file with the same extension already exists in the folder, you will be prompted to overwrite it. If you previously turned off the `Index File Manager` warning message, you need to click the Notification button in the bottom right corner to see this warning message.

## Installation

To install the extension, search for `Index File Manager` in the VSCode Extensions Marketplace and click Install.

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
