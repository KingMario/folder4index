import assert from "assert";
import sinon from "sinon";
import vscode from "vscode";

import { FolderForIndex } from "../folder4Index";

suite("FolderForIndex", () => {
  const extensions = [".js", ".ts", ".jsx", ".tsx"];

  let folderForIndex: FolderForIndex;
  let showInformationMessageStub: sinon.SinonStub;
  let renameFileStub: sinon.SinonStub;
  let workspaceEditStub: sinon.SinonStub;
  let applyEditStub: sinon.SinonStub;

  setup(() => {
    showInformationMessageStub = sinon.stub(
      vscode.window,
      "showInformationMessage"
    );

    renameFileStub = sinon.stub();

    workspaceEditStub = sinon.stub(vscode, "WorkspaceEdit").returns({
      renameFile: renameFileStub,
    });
    applyEditStub = sinon.stub(vscode.workspace, "applyEdit");
  });

  teardown(() => {
    sinon.restore();
  });

  test("should prompt to rename index files", () => {
    folderForIndex = new FolderForIndex("src/folder/index.js");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/index.ts");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/index.jsx");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/index.tsx");
    folderForIndex.promptToRename();

    assert.ok(showInformationMessageStub.callCount === 4);
  });

  test("should prompt to rename non-index files", () => {
    folderForIndex = new FolderForIndex("src/folder/file.ts");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/file.ts");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/file.jsx");
    folderForIndex.promptToRename();

    folderForIndex = new FolderForIndex("src/folder/file.tsx");
    folderForIndex.promptToRename();

    assert.ok(showInformationMessageStub.callCount === 4);
  });

  test("should rename file and move to parent folder", async () => {
    const index = Math.floor(Math.random() * extensions.length);
    const extension = extensions[index];

    const filename = `src/folder/index${extension}`;

    folderForIndex = new FolderForIndex(filename);
    await folderForIndex.renameFile();

    assert.ok(workspaceEditStub.calledOnce);
    assert.ok(
      renameFileStub.calledOnceWith(
        vscode.Uri.file(filename),
        vscode.Uri.file(filename.replace("/index", ""))
      )
    );
    assert.ok(applyEditStub.calledOnce);
  });

  test("should rename file and move to sub folder", async () => {
    const index = Math.floor(Math.random() * extensions.length);
    const extension = extensions[index];

    const filename = `src/folder/file${extension}`;
    folderForIndex = new FolderForIndex(filename);
    await folderForIndex.renameFile();

    assert.ok(workspaceEditStub.calledOnce);
    assert.ok(
      renameFileStub.calledOnceWith(
        vscode.Uri.file(filename),
        vscode.Uri.file(filename.replace(extension, `/index${extension}`))
      )
    );
    assert.ok(applyEditStub.calledOnce);
  });
});
