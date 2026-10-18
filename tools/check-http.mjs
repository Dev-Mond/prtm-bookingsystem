import assert from 'node:assert/strict';

// Run against the local PHP server after `npm run build`, with Vite stopped.
const base = new URL(process.argv[2] || 'http://127.0.0.1:8000');
const get = (path, headers = {}) => fetch(new URL(path, base), { headers, redirect: 'manual' });

const initial = await get('/');
assert.equal(initial.status, 200, 'The welcome page must load');
assert.match(initial.headers.get('content-type'), /text\/html/);
const html = await initial.text();
const pageScript = html.match(/<script data-page="app" type="application\/json">(.*?)<\/script>/s);
assert.ok(pageScript, 'Initial HTML must contain the Inertia page payload');
const page = JSON.parse(pageScript[1]);
assert.equal(page.component, 'Welcome');
assert.equal(page.props.appName, 'Booking System');
assert.ok(page.version, 'Built assets must have a cache-busting version');
assert.ok(!html.includes('@vite/client'), 'This check expects built assets, not the Vite server');

const assetUrls = [...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]*\/build\/[^"]+)"/g)]
    .map((match) => match[1]);
assert.ok(assetUrls.some((url) => url.endsWith('.js')), 'A built React entry must be present');
assert.ok(assetUrls.some((url) => url.endsWith('.css')), 'Built SCSS styles must be present');
for (const assetUrl of new Set(assetUrls)) {
    const asset = await get(new URL(assetUrl, base).pathname);
    assert.equal(asset.status, 200, `Built asset must be served: ${assetUrl}`);
    assert.doesNotMatch(asset.headers.get('content-type') || '', /text\/html/);
}

const navigation = await get('/about', {
    'X-Inertia': 'true',
    'X-Inertia-Version': page.version,
    Accept: 'text/html, application/xhtml+xml',
});
assert.equal(navigation.status, 200);
assert.equal(navigation.headers.get('x-inertia'), 'true');
const about = await navigation.json();
assert.equal(about.component, 'About');
assert.equal(about.url, '/about');

for (const [path, component] of [
    ['/dashboard/profile', 'Dashboard/Profile'],
    ['/dashboard/add-listing', 'Dashboard/AddListing'],
    ['/dashboard/bookings', 'Dashboard/Bookings'],
    ['/dashboard/reviews', 'Dashboard/Reviews'],
]) {
    const response = await get(path, {
        'X-Inertia': 'true',
        'X-Inertia-Version': page.version,
    });
    assert.equal(response.status, 200, `${path} must load`);
    assert.equal((await response.json()).component, component);
}

const stale = await get('/about', { 'X-Inertia': 'true', 'X-Inertia-Version': 'outdated-assets' });
assert.equal(stale.status, 409);
assert.ok(stale.headers.get('x-inertia-location')?.endsWith('/about'));
assert.equal((await get('/does-not-exist')).status, 404);
assert.equal((await get('/.env')).status, 404);
console.log('HTTP checks passed: HTML, built JS/CSS, Inertia navigation, four dashboard previews, stale assets, 404, and private env path.');
