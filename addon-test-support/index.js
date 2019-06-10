/**
 * Used to set up engine resolver for a unit test.
 *
 *   Responsible for:
 *     - create an engine object and set it on the provided context (e.g. `this.engine`)
 *
 * @method setupEngineTest
 * @param {NestedHooks} hooks
 * @param {String} engineName
 * @public
 */

export function setupEngineTest(hooks, engineName) {
  hooks.beforeEach(function() {
    let engineInstance = this.owner.buildChildEngineInstance(engineName);
    return engineInstance.boot().then(() => {
      this.engine = engineInstance;
    });
  });
}