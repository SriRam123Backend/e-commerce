import { module, test } from 'qunit';

import { setupTest } from 'e-commerce/tests/helpers';

module('Unit | Adapter | color', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:color');
    assert.ok(adapter);
  });
});
