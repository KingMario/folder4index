import path from "path";
import vscode from "vscode";

export class Folder4Index {
  private fileRenamingInfo: FileRenamingInfo | null = null;

  constructor(filePath: string) {
    this.processFilePath(filePath);
  }

  private processFilePath(filePath: string) {
    const fileExtension = path.extname(filePath);

    if ([".js", ".ts", ".jsx", ".tsx"].includes(fileExtension)) {
      const indexIdentifier = `index${fileExtension}`;

      if (path.basename(filePath) === indexIdentifier) {
        const folderName = path.basename(path.dirname(filePath));
        const displayName = `${folderName}/${indexIdentifier}`;
        const newFileName = `${folderName}${fileExtension}`;
        const newFilePath = path.join(
          path.dirname(filePath),
          "..",
          newFileName
        );

        this.fileRenamingInfo = {
          filePath,
          displayName,
          newFileName,
          newFilePath,
        };
      }
    }
  }

  async promptToRename() {
    if (this.fileRenamingInfo) {
      const selection = await vscode.window.showInformationMessage<string>(
        `${this.fileRenamingInfo.displayName}. Would you like to rename it to ${this.fileRenamingInfo.newFileName} and place it in the parent directory?`,
        "Rename"
      );

      if (selection === "Rename") {
        await this.renameFileAndMoveToParentDirectory();
      }
    }
  }

  async renameFileAndMoveToParentDirectory() {
    if (this.fileRenamingInfo) {
      const oldUri = vscode.Uri.file(this.fileRenamingInfo.filePath);
      const newUri = vscode.Uri.file(this.fileRenamingInfo.newFilePath);

      const workspaceEdit = new vscode.WorkspaceEdit();
      workspaceEdit.renameFile(oldUri, newUri);

      try {
        const success = await vscode.workspace.applyEdit(workspaceEdit);
        if (!success) {
          vscode.window.showErrorMessage("Failed to rename file");
        }
      } catch (error: unknown) {
        vscode.window.showErrorMessage(
          `An error occurred: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }
  }
}

interface FileRenamingInfo {
  filePath: string;
  displayName: string;
  newFileName: string;
  newFilePath: string;
}
