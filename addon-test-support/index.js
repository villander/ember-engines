import { setupRenderingTest, setupTest } from 'ember-qunit';
import engineResolverFor from 'ember-engines/test-support/engine-resolver-for';

/**
 * Used to set up engine resolver for a unit test.
 *
 * @method setupEngineTest
 * @param {NestedHooks} hooks
 * @param {String} engineName
 * @public
 */

export function setupEngineTest(hooks, engineName) {
  // eslint-disable-next-line ember/no-restricted-resolver-tests
  setupTest(hooks, { resolver: engineResolverFor(engineName) });
}

/**
 * Used to set up engine resolver for a integration test.
 *
 * @method setupEngineRenderingTest
 * @param {NestedHooks} hooks
 * @param {String} engineName
 * @public
 */

export function setupEngineRenderingTest(hooks, engineName) {
  setupRenderingTest(hooks, { resolver: engineResolverFor(engineName) });
}