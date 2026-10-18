import assert from 'node:assert/strict';
import test from 'node:test';
import { filterStays } from '../../resources/js/data/stays.js';

const stays = [
    { id: 'one', name: 'Central Garden', city: 'London' },
    { id: 'two', name: 'Riverside House', city: 'Paris' },
];

test('a blank destination shows all sample stays', () => {
    assert.deepEqual(filterStays(stays, '  '), stays);
});

test('destination search ignores case and surrounding spaces', () => {
    assert.deepEqual(filterStays(stays, ' PARIS '), [stays[1]]);
});

test('travelers can find a stay by its name', () => {
    assert.deepEqual(filterStays(stays, 'garden'), [stays[0]]);
});

test('an unknown destination has an empty result instead of unrelated stays', () => {
    assert.deepEqual(filterStays(stays, 'Tokyo'), []);
    assert.deepEqual(
        stays.map((stay) => stay.id),
        ['one', 'two'],
    );
});
