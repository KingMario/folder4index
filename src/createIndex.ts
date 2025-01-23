import path from "path";
import vscode from "vscode";

export const extensions = ["js", "ts", "jsx", "tsx"] as const;

export type Extension = (typeof extensions)[number];

export async function createIndex(folderPath: string, ext: Extension) {
  try {
    const folderUri = vscode.Uri.file(folderPath);
    const relativeFolderPath = vscode.workspace.asRelativePath(folderUri);

    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Window,
        title: "Creating index file...",
        cancellable: false,
      },
      async (progress) => {
        const indexFileUri = vscode.Uri.file(`${folderPath}/index.${ext}`);
        let fileExists = true;

        try {
          await vscode.workspace.fs.stat(indexFileUri);
        } catch (error) {
          if ((error as vscode.FileSystemError).code === "FileNotFound") {
            fileExists = false;
          } else {
            throw error;
          }
        }

        if (fileExists) {
          const overwrite = await vscode.window.showWarningMessage(
            `Index file already exists in the folder. Do you want to overwrite it?`,
            "Overwrite"
          );
          if (overwrite !== "Overwrite") {
            return;
          }
        }

        progress.report({ increment: 0, message: "Finding files..." });
        const files = await findFiles(relativeFolderPath);

        progress.report({ increment: 50, message: "Generating exports..." });
        const exports = generateExports(files);
        exports.push("");

        const indexFilePath = `${folderPath}/index.${ext}`;
        const indexFileContent = exports.join("\n");

        progress.report({ increment: 75, message: "Writing index file..." });
        await writeFile(indexFilePath, indexFileContent);

        progress.report({ increment: 100, message: "Opening index file..." });
        await openFile(indexFilePath);
      }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;
    vscode.window.showErrorMessage(
      `Failed to create index file: ${errorMessage}`
    );
  }
}

async function findFiles(relativeFolderPath: string): Promise<vscode.Uri[]> {
  return vscode.workspace.findFiles(
    `${relativeFolderPath}/*.{js,jsx,ts,tsx}`,
    `${relativeFolderPath}/index.{js,jsx,ts,tsx}`
  );
}

function generateExports(files: vscode.Uri[]): string[] {
  return files.map(
    (file) =>
      `export * from "./${path.basename(
        file.fsPath,
        path.extname(file.fsPath)
      )}";`
  );
}

async function writeFile(filePath: string, content: string): Promise<void> {
  const fileUri = vscode.Uri.file(filePath);
  await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content));
}

async function openFile(filePath: string): Promise<void> {
  const fileUri = vscode.Uri.file(filePath);
  const doc = await vscode.workspace.openTextDocument(fileUri);
  await vscode.window.showTextDocument(doc);
}
