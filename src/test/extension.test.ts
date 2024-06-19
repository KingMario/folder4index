import assert from "assert";
import sinon from "sinon";
import vscode from "vscode";
import { activate, deactivate } from "../extension";

suite("Extension Test Suite", () => {
  let sandbox: sinon.SinonSandbox;
  let context: vscode.ExtensionContext;

  setup(() => {
    sandbox = sinon.createSandbox();
    context = {
      subscriptions: {
        push: sandbox.stub(),
      },
    } as unknown as vscode.ExtensionContext;
  });

  teardown(() => {
    sandbox.restore();
  });

  test("activate should register events and commands", () => {
    const onDidChangeActiveTextEditorStub = sandbox.stub(
      vscode.window,
      "onDidChangeActiveTextEditor"
    );
    const registerCommandStub = sandbox.stub(
      vscode.commands,
      "registerCommand"
    );

    activate(context);

    assert.ok(onDidChangeActiveTextEditorStub.calledOnce);
    assert.ok(registerCommandStub.calledWith("FolderForIndex.rename"));
  });

  test("deactivate should not throw error", () => {
    assert.doesNotThrow(deactivate);
  });
});
