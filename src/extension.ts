import vscode from "vscode";

import { Folder4Index } from "./folder4Index";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(
      (editor: vscode.TextEditor | undefined) =>
        new Folder4Index(editor!.document.fileName).promptToRename()
    ),
    vscode.commands.registerCommand(
      "folder4index.rename",
      ({ fsPath }: vscode.Uri) =>
        new Folder4Index(fsPath).renameFileAndMoveToParentDirectory()
    )
  );
}

export function deactivate() {}
