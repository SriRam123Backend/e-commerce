import { module, test } from 'qunit';
import { setupTest } from 'e-commerce/tests/helpers';

module('Unit | Service | product', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:product');
    assert.ok(service);
  });
});
