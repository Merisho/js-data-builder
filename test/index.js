const assert = require('assert');

const DataBuilder = require('../index');

describe('Data Builder', () => {
    it('Should build new object every time', () => {
        const builder = new DataBuilder();

        builder.with('test key', 'test value');

        assert(builder.build() !== builder.build());
    });

    it('Should create copies of objects to avoid implicit mutation', () => {
        const builder = new DataBuilder();

        const object = {};
        builder.with('object', object);

        assert(builder.obj.object !== object);
    });

    it('Should merge value to existing object with specified key', () => {
        const builder = new DataBuilder();

        builder.with('object', { a: 1 }).with('object', { b: 2 });

        const actual = builder.build();
        const expected = {
            object: {
                a: 1,
                b: 2
            }
        };

        assert.deepEqual(actual, expected);
    });

    it('Should build with arrays', () => {
        const builder = new DataBuilder();

        builder.with('array', []);

        const actual = builder.build();

        assert(actual.array instanceof Array);
    });

    it('Should concat arrays if it exists with specified key', () => {
        const builder = new DataBuilder();

        builder.with('array', [ 1, 2, 3 ]).with('array', [ 4, 5, 6 ]);

        const actual = builder.build();
        const expected = {
            array: [ 1, 2, 3, 4, 5, 6 ]
        };

        assert.deepEqual(actual, expected);
    });

    it('Should replace old value if new value passed which is another type', () => {
        const builder = new DataBuilder();

        builder.with('val', {a: 1}).with('val', [1]);

        const actual = builder.build();
        const expected = {
            val: [1]
        };

        assert.deepEqual(actual, expected);
    });
});