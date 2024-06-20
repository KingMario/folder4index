import vscode from "vscode";

import { FolderForIndex } from "./folder4Index";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(
      (editor) =>
        editor && new FolderForIndex(editor.document.fileName).promptToRename()
    ),
    vscode.commands.registerCommand(
      "FolderForIndex.rename",
      ({ fsPath }: vscode.Uri) =>
        new FolderForIndex(fsPath).renameFile()
    )
  );
}

export function deactivate() {}
