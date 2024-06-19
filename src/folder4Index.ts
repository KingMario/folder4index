import path from "path";
import vscode from "vscode";

export class FolderForIndex {
  private fileRenamingInfo: FileRenamingInfo | null = null;

  constructor(filePath: string) {
    this.processFilePath(filePath);
  }

  private processFilePath(filePath: string) {
    const fileExtension = path.extname(filePath);

    if ([".js", ".ts", ".jsx", ".tsx"].includes(fileExtension)) {
      const indexIdentifier = `index${fileExtension}`;
      const isIndexFile = path.basename(filePath) === indexIdentifier;

      if (isIndexFile) {
        const folderName = path.basename(path.dirname(filePath));
        const displayName = `${folderName}/${indexIdentifier}`;
        const newFileName = `${folderName}${fileExtension}`;
        const newFilePath = path.join(
          path.dirname(filePath),
          "..",
          newFileName
        );

        this.fileRenamingInfo = {
          isIndexFile,
          filePath,
          displayName,
          newFileName,
          newFilePath,
        };
      } else {
        const displayName = path.basename(filePath);
        const newFileName = `${path.basename(
          displayName,
          fileExtension
        )}/${indexIdentifier}`;
        const newFilePath = path.join(path.dirname(filePath), newFileName);

        this.fileRenamingInfo = {
          isIndexFile,
          filePath,
          displayName,
          newFileName,
          newFilePath,
        };
      }
    }
  }

  async promptToRename() {
    if (this.fileRenamingInfo?.isIndexFile) {
      const selection = await vscode.window.showInformationMessage<string>(
        `${this.fileRenamingInfo.displayName}. Would you like to rename it to ${this.fileRenamingInfo.newFileName} and place it in the parent folder?`,
        "Rename"
      );

      if (selection === "Rename") {
        await this.renameFile();
      }
    }
  }

  async renameFile() {
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
  isIndexFile: boolean;
  filePath: string;
  displayName: string;
  newFileName: string;
  newFilePath: string;
}
