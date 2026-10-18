import assert from 'node:assert/strict';
import test from 'node:test';
import {
    filterBookings,
    validatePreviewFiles,
} from '../../resources/js/data/dashboard.js';

test('booking status filters never include another status', () => {
    const items = [
        { id: 1, status: 'Confirmed' },
        { id: 2, status: 'Pending' },
    ];
    assert.deepEqual(filterBookings(items, 'Pending'), [
        { id: 2, status: 'Pending' },
    ]);
    assert.equal(filterBookings(items, 'All').length, 2);
    assert.deepEqual(filterBookings(items, 'Cancelled'), []);
    assert.equal(items.length, 2);
});

test('image previews reject unsupported content and oversized files', () => {
    assert.equal(
        validatePreviewFiles([{ type: 'image/jpeg', size: 1024 }]),
        '',
    );
    assert.equal(
        validatePreviewFiles([{ type: 'image/svg+xml', size: 1024 }]),
        'Choose JPEG, PNG, or WebP images only.',
    );
    assert.equal(
        validatePreviewFiles([
            { type: 'image/png', size: 5 * 1024 * 1024 + 1 },
        ]),
        'Each image must be 5 MB or smaller.',
    );
    assert.equal(
        validatePreviewFiles(Array(7).fill({ type: 'image/jpeg', size: 1024 })),
        'Choose up to 6 images.',
    );
});
