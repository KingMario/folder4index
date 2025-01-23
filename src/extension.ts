import vscode from "vscode";

import { FolderForIndex } from "./folder4Index";
import { createIndex, extensions } from "./createIndex";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "FolderForIndex.rename",
      ({ fsPath }: vscode.Uri) => new FolderForIndex(fsPath).renameFile()
    ),
    ...extensions.map((ext) =>
      vscode.commands.registerCommand(
        `FolderForIndex.newIndex.${ext}`,
        ({ fsPath }: vscode.Uri) => createIndex(fsPath, ext)
      )
    )
  );
}

export function deactivate() {}
