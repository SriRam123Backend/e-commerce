import { module, test } from 'qunit';

import { setupTest } from 'e-commerce/tests/helpers';

module('Unit | Model | color', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('color', {});
    assert.ok(model);
  });
});
