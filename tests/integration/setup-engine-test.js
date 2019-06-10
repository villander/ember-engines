import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupEngineRenderingTest, setupEngineTest } from 'ember-engines/test-support';

module('Acceptance | Starting Engines', function () {

  module('setupEngineTest', function (hooks) {

    setupEngineTest(hooks, 'ember-blog');

    test('it exists', function (assert) {
      assert.expect(1);

      let route = this.owner.lookup('route:post.likes');
      assert.ok(route);
    });
  });

  module('setupEngineRenderingTest', function (hooks) {

    setupEngineRenderingTest(hooks, 'ember-blog');

    test('should change colors', async function(assert) {
      assert.expect(2);
  
      // set the outer context to red
      this.set('colorValue', 'red');
  
      await render(hbs`{{pretty-color name=colorValue}}`);
  
      assert.equal(this.element.querySelector('div').getAttribute('style'), 'color: red', 'starts as red');

      this.set('colorValue', 'blue');

      assert.equal(this.element.querySelector('div').getAttribute('style'), 'color: blue', 'updates to blue');
    });
  });

});