import { Link, usePage } from '@inertiajs/react';
import PageLayout from '../layouts/PageLayout';

export default function About() {
    const { links } = usePage().props;

    return (
        <PageLayout title="About">
            <section className="hero" aria-labelledby="about-heading">
                <span className="eyebrow">A modern monolith</span>
                <h1 id="about-heading">Connected by design.</h1>
                <p className="intro">Laravel owns the routes and sends page data through Inertia. React renders the interface without a separate frontend service or API layer.</p>
                <p className="intro">JavaScript and SCSS are bundled by Vite. Production serves those built files alongside PHP; no Node server is required.</p>
                <Link className="button" href={links.home}>Back to home <span aria-hidden="true">↗</span></Link>
            </section>
        </PageLayout>
    );
}
