import { Link, usePage } from '@inertiajs/react';
import PageLayout from '../layouts/PageLayout';

export default function Welcome() {
    const { links } = usePage().props;

    return (
        <PageLayout title="Welcome">
            <section className="hero" aria-labelledby="welcome-heading">
                <span className="eyebrow">Your next chapter starts here</span>
                <h1 id="welcome-heading">A fresh start<br />for better bookings.</h1>
                <p className="intro">Your application foundation is ready. Laravel handles the server, React brings the interface to life, and Inertia connects them.</p>
                <Link className="button" href={links.about}>Explore the foundation <span aria-hidden="true">↗</span></Link>
            </section>
            <section className="feature-grid" aria-label="Application foundation">
                <article><span className="feature-number">01</span><h2>One application</h2><p>Server routes and React pages, working together on a single domain.</p></article>
                <article><span className="feature-number">02</span><h2>Built to grow</h2><p>A focused starting point for your booking workflows and business rules.</p></article>
                <article><span className="feature-number">03</span><h2>Simple to deploy</h2><p>Build your assets, then serve the application from your PHP hosting.</p></article>
            </section>
        </PageLayout>
    );
}
