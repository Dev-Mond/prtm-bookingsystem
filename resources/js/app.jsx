import { createInertiaApp } from '@inertiajs/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../scss/app.scss';
import '../scss/dashboard.scss';

const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
const appName = import.meta.env.VITE_APP_NAME || 'Booking System';

createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: (name) => pages[`./pages/${name}.jsx`],
    setup({ el, App, props }) {
        createRoot(el).render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: { color: '#156c59' },
});
