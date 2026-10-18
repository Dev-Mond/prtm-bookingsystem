import { Link, usePage } from '@inertiajs/react';
import PageLayout from './PageLayout';
import Icon from '../components/Icon';
import { dashboardLinks } from '../data/dashboard';

export default function DashboardLayout({ title, children }) {
    const { url } = usePage();
    return (
        <PageLayout title={title}>
            <section
                className="dashboard-hero"
                style={{
                    '--dashboard-photo': "url('/images/travel/hotel-pool.jpg')",
                }}
            >
                <div className="container">
                    <div className="dashboard-welcome">
                        <span className="dashboard-avatar">JD</span>
                        <div>
                            <span>Welcome to your dashboard</span>
                            <h1>Jamie Demo</h1>
                            <p>Let's make your next stay a great one.</p>
                        </div>
                        <Link
                            href="/dashboard/add-listing"
                            className="button button--yellow"
                        >
                            Add new listing <Icon name="plus" size={16} />
                        </Link>
                    </div>
                </div>
            </section>
            <div className="dashboard-breadcrumb">
                <div className="container">
                    <Link href="/">Home</Link>
                    <Icon name="chevron" size={12} />
                    <span>Dashboard</span>
                    <Icon name="chevron" size={12} />
                    <strong>{title}</strong>
                </div>
            </div>
            <section className="dashboard-section">
                <div className="container dashboard-grid">
                    <aside className="dashboard-sidebar">
                        <div className="dashboard-sidebar__heading">
                            <Icon name="users" size={19} />
                            Your account <span>PREVIEW</span>
                        </div>
                        <nav aria-label="Dashboard">
                            {dashboardLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={
                                        url.split('?')[0] === link.href
                                            ? 'page'
                                            : undefined
                                    }
                                >
                                    <Icon name={link.icon} size={18} />
                                    {link.title}
                                    <Icon name="arrow" size={13} />
                                </Link>
                            ))}
                        </nav>
                        <Link className="dashboard-return" href="/">
                            <Icon name="home" size={17} />
                            Back to collection
                        </Link>
                        <p>
                            Sample account. No sign-in is required, and no
                            private account data is shown.
                        </p>
                    </aside>
                    <div className="dashboard-content">
                        <div className="dashboard-page-heading">
                            <h2>{title}</h2>
                            <span>EasyBook dashboard</span>
                        </div>
                        <p className="preview-note">
                            Frontend preview · Sample data only. Changes reset
                            when you leave this page; nothing is sent or saved.
                        </p>
                        {children}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
