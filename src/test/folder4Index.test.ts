import assert from "assert";
import sinon from "sinon";
import vscode from "vscode";

import { Folder4Index } from "../folder4Index";

suite("Folder4Index", () => {
  let folder4Index: Folder4Index;
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
    folder4Index = new Folder4Index("src/folder/index.js");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/index.ts");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/index.jsx");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/index.tsx");
    folder4Index.promptToRename();

    assert.ok(showInformationMessageStub.callCount === 4);
  });

  test("should not prompt to rename non-index files", () => {
    folder4Index = new Folder4Index("src/folder/file.ts");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/file.ts");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/file.jsx");
    folder4Index.promptToRename();

    folder4Index = new Folder4Index("src/folder/file.tsx");
    folder4Index.promptToRename();

    assert.ok(showInformationMessageStub.notCalled);
  });

  test("should rename file and move to parent directory", async () => {
    folder4Index = new Folder4Index("src/folder/index.js");
    await folder4Index.renameFileAndMoveToParentDirectory();

    assert.ok(workspaceEditStub.calledOnce);
    assert.ok(
      renameFileStub.calledOnceWith(
        vscode.Uri.file("src/folder/index.js"),
        vscode.Uri.file("src/folder.js")
      )
    );
    assert.ok(applyEditStub.calledOnce);
  });

  test("should not rename file and move to parent directory", async () => {
    folder4Index = new Folder4Index("src/folder/file.js");
    await folder4Index.renameFileAndMoveToParentDirectory();

    assert.ok(workspaceEditStub.notCalled);
    assert.ok(renameFileStub.notCalled);
    assert.ok(applyEditStub.notCalled);
  });
});
