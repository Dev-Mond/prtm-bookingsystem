import { Head, Link, usePage } from '@inertiajs/react';

export default function PageLayout({ title, children }) {
    const { component, props: { appName, links } } = usePage();

    return (
        <>
            <Head title={title} />
            <a className="skip-link" href="#main">Skip to content</a>
            <div className="app-shell">
                <header className="site-header">
                    <Link href={links.home} className="brand">{appName}</Link>
                    <nav aria-label="Main navigation">
                        <Link href={links.home} aria-current={component === 'Welcome' ? 'page' : undefined}>Home</Link>
                        <Link href={links.about} aria-current={component === 'About' ? 'page' : undefined}>About</Link>
                    </nav>
                </header>
                <main id="main" tabIndex={-1}>{children}</main>
                <footer className="site-footer">Laravel + Inertia + React</footer>
            </div>
        </>
    );
}
