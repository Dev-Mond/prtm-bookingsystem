import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

// Render with real Inertia context, without a browser or production SSR server.
// This catches render-time errors that compilation and PHP route tests cannot.
test('all public preview pages render their content and shared account dialog', async () => {
    const server = await createServer({
        configFile: false,
        plugins: [react()],
        server: { middlewareMode: true, watch: null },
        appType: 'custom',
    });
    try {
        for (const [component, text] of [
            ['Welcome', 'EasyBook Hotel Booking System'],
            ['About', 'About'],
            ['Dashboard/Profile', 'Your profile'],
            ['Dashboard/AddListing', 'Basic information'],
            ['Dashboard/Bookings', 'EB-1001'],
            ['Dashboard/Reviews', 'Based on 3 fictional reviews'],
        ]) {
            const result = await createInertiaApp({
                page: {
                    component,
                    url: '/',
                    version: null,
                    props: {
                        appName: 'Booking System',
                        links: { home: '/', about: '/about' },
                        errors: {},
                    },
                    clearHistory: false,
                    encryptHistory: false,
                },
                resolve: async (name) =>
                    (
                        await server.ssrLoadModule(
                            `/resources/js/pages/${name}.jsx`,
                        )
                    ).default,
                setup: ({ App, props }) => createElement(App, props),
                render: renderToString,
            });
            assert.ok(
                result.body.includes(text),
                `${component} must render its content`,
            );
            assert.ok(
                result.body.includes('Log in preview'),
                `${component} must include account access`,
            );
        }
    } finally {
        await server.close();
    }
});
