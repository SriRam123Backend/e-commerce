import { module, test } from 'qunit';

import { setupTest } from 'e-commerce/tests/helpers';

module('Unit | Serializer | cart', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('cart');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('cart', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
