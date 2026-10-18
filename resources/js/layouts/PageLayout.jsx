import { Head, Link, usePage } from '@inertiajs/react';
import { useId, useRef, useState } from 'react';
import Icon from '../components/Icon';
import AuthDialog from '../components/AuthDialog';

export default function PageLayout({
    title,
    children,
    savedCount = 0,
    onShowSaved,
}) {
    const {
        component,
        props: { appName, links },
    } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [info, setInfo] = useState({ title: '', text: '' });
    const infoDialog = useRef(null);
    const authDialog = useRef(null);
    const id = useId();

    function showInfo(title, text) {
        setInfo({ title, text });
        infoDialog.current.showModal();
    }

    const openSignIn = () => authDialog.current.showModal();

    return (
        <>
            <Head title={title} />
            <a className="skip-link" href="#main">
                Skip to content
            </a>
            <header className="travel-header">
                <div className="header-top">
                    <div className="container header-top__inner">
                        <Link
                            href={links.home}
                            className="brand"
                            aria-label={`${appName} home`}
                        >
                            <span className="brand-mark">
                                <Icon name="pin" size={32} />
                                <Icon name="bed" size={13} />
                            </span>
                            <span>
                                EASY<span className="brand-book">BOOK</span>
                            </span>
                        </Link>
                        <div className="header-tools">
                            <details className="utility-menu">
                                <summary>
                                    <span className="text-cyan">$</span> USD{' '}
                                    <Icon name="chevron" size={12} />
                                </summary>
                                <div className="utility-menu__panel">
                                    US Dollar <Icon name="check" size={14} />
                                </div>
                            </details>
                            <details className="utility-menu">
                                <summary>
                                    <span aria-hidden="true">🇬🇧</span> Eng{' '}
                                    <Icon name="chevron" size={12} />
                                </summary>
                                <div className="utility-menu__panel">
                                    English <Icon name="check" size={14} />
                                </div>
                            </details>
                            <button
                                className="sign-in"
                                aria-label="Sign in or register"
                                onClick={openSignIn}
                                type="button"
                            >
                                <Icon name="login" size={15} />
                                <span>Sign In</span>
                            </button>
                            <Link
                                className="add-hotel"
                                href="/dashboard/add-listing"
                            >
                                Add Your Hotel <Icon name="plus" size={15} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="container header-bottom__inner">
                        <Link
                            className="home-icon"
                            href={links.home}
                            aria-label="Home"
                        >
                            <Icon name="home" size={17} />
                        </Link>
                        <button
                            className="mobile-menu-button"
                            type="button"
                            aria-controls={`${id}-navigation`}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <Icon name={menuOpen ? 'close' : 'menu'} />
                            <span>Menu</span>
                        </button>
                        <nav
                            id={`${id}-navigation`}
                            className={`main-navigation ${menuOpen ? 'is-open' : ''}`}
                            aria-label="Main navigation"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Link
                                href={links.home}
                                aria-current={
                                    component === 'Welcome' ? 'page' : undefined
                                }
                            >
                                Home <Icon name="chevron" size={12} />
                            </Link>
                            <a href={`${links.home}#hotels`}>
                                Listings <Icon name="chevron" size={12} />
                            </a>
                            <a href={`${links.home}#journal`}>News</a>
                            <Link
                                href={links.about}
                                aria-current={
                                    component === 'About' ? 'page' : undefined
                                }
                            >
                                About <Icon name="chevron" size={12} />
                            </Link>
                        </nav>
                        <div className="header-bottom__actions">
                            <Link
                                className="account-button"
                                href="/dashboard/profile"
                                aria-label="Sample account dashboard"
                            >
                                <span className="guest-avatar">G</span>
                                <span>My account</span>
                                <Icon name="chevron" size={12} />
                            </Link>
                            {onShowSaved ? (
                                <button
                                    type="button"
                                    className="saved-button"
                                    onClick={onShowSaved}
                                    aria-label={`Show ${savedCount} saved stays`}
                                >
                                    <Icon name="heart" size={20} />
                                    <span>{savedCount}</span>
                                </button>
                            ) : (
                                <Link
                                    className="saved-button"
                                    href={`${links.home}#hotels`}
                                    aria-label="Browse stays"
                                >
                                    <Icon name="heart" size={20} />
                                    <span>0</span>
                                </Link>
                            )}
                            <a
                                className="header-search-link"
                                href={`${links.home}#search`}
                            >
                                Search <Icon name="search" size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <main
                id="main"
                tabIndex={-1}
                className={
                    component === 'Welcome' ||
                    component.startsWith('Dashboard/')
                        ? undefined
                        : 'simple-page container'
                }
            >
                {children}
            </main>
            <footer className="travel-footer">
                <section className="newsletter">
                    <div className="container newsletter__inner">
                        <div>
                            <h2>Subscribe</h2>
                            <p>
                                Travel inspiration and handpicked stays,
                                straight to your inbox.
                            </p>
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                showInfo(
                                    'Thanks for your interest!',
                                    'Our travel newsletter is coming soon. Your email has not been stored or subscribed.',
                                );
                            }}
                        >
                            <label
                                className="sr-only"
                                htmlFor={`${id}-newsletter`}
                            >
                                Your email address
                            </label>
                            <input
                                id={`${id}-newsletter`}
                                type="email"
                                placeholder="Your email address"
                                required
                            />
                            <button type="submit">
                                Subscribe <Icon name="mail" size={15} />
                            </button>
                        </form>
                    </div>
                </section>
                <div className="container footer-main">
                    <section className="footer-about">
                        <h2>About Us</h2>
                        <p>
                            A great trip starts with a great place to stay.
                            Discover city hideaways, beautiful resorts, and
                            memorable places around the world.
                        </p>
                        <p>
                            Find your next destination. Make yourself at home.
                        </p>
                        <div className="footer-contact">
                            <Icon name="mail" size={16} />
                            <button
                                type="button"
                                onClick={() =>
                                    showInfo(
                                        'Get in touch',
                                        'Our guest support team will be available when reservations open. Browse the sample collection in the meantime.',
                                    )
                                }
                            >
                                Contact our team
                            </button>
                        </div>
                        <div className="social-links">
                            <span>Find us:</span>
                            {['f', 'in', 'ig'].map((social) => (
                                <button
                                    type="button"
                                    key={social}
                                    aria-label={`${social === 'f' ? 'Facebook' : social === 'in' ? 'LinkedIn' : 'Instagram'} information`}
                                    onClick={() =>
                                        showInfo(
                                            'Follow the journey',
                                            'Our social channels are coming soon. Stay tuned for more travel inspiration.',
                                        )
                                    }
                                >
                                    {social}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section className="footer-news">
                        <h2>Travel Inspiration</h2>
                        {[
                            {
                                image: 'rome',
                                title: 'A weekend worth remembering',
                                date: 'City escapes',
                            },
                            {
                                image: 'paris',
                                title: 'Find your perfect city stay',
                                date: 'Places we love',
                            },
                            {
                                image: 'hotel-pool',
                                title: 'Take the scenic route',
                                date: 'Travel tips',
                            },
                        ].map((item) => (
                            <a
                                className="footer-news-item"
                                href={`${links.home}#journal`}
                                key={item.title}
                            >
                                <img
                                    src={`/images/travel/${item.image}.jpg`}
                                    alt=""
                                    width="72"
                                    height="54"
                                    loading="lazy"
                                />
                                <span>
                                    <strong>{item.title}</strong>
                                    <small>{item.date}</small>
                                </span>
                            </a>
                        ))}
                    </section>
                    <section className="footer-links">
                        <h2>Helpful links</h2>
                        <Link href={links.about}>About Our Company</Link>
                        <a href={`${links.home}#journal`}>Our Travel Journal</a>
                        <a href={`${links.home}#destinations`}>
                            Popular Destinations
                        </a>
                        <a href={`${links.home}#why-us`}>Why Choose Us</a>
                        <Link href="/dashboard/add-listing">
                            Become a Partner
                        </Link>
                        <button
                            type="button"
                            className="footer-app-button"
                            onClick={() =>
                                showInfo(
                                    'Take EasyBook with you',
                                    'Our mobile app is coming soon. This website works on your phone and tablet today.',
                                )
                            }
                        >
                            <Icon name="phone" /> Mobile app coming soon
                        </button>
                    </section>
                </div>
                <div className="container footer-support">
                    <button
                        className="button button--cyan"
                        type="button"
                        onClick={() =>
                            showInfo(
                                'Here to help',
                                'Guest support opens with our booking service. For now, enjoy exploring the collection.',
                            )
                        }
                    >
                        <Icon name="support" /> Get In Touch
                    </button>
                    <p>
                        <Icon name="support" /> Made for travelers. Ready for
                        your next adventure.
                    </p>
                    <a
                        href="#main"
                        className="back-to-top"
                        aria-label="Back to top"
                    >
                        ↑
                    </a>
                </div>
                <div className="sub-footer">
                    <div className="container">
                        <p>
                            © {new Date().getFullYear()} {appName}. All rights
                            reserved.
                        </p>
                        <span>
                            English <Icon name="chevron" size={12} />
                        </span>
                    </div>
                </div>
            </footer>
            <AuthDialog dialogRef={authDialog} />
            <dialog
                ref={infoDialog}
                className="site-dialog"
                aria-labelledby={`${id}-dialog-title`}
                onClick={(event) => {
                    if (event.target === event.currentTarget)
                        infoDialog.current.close();
                }}
            >
                <div className="site-dialog__content">
                    <button
                        className="dialog-close"
                        type="button"
                        aria-label="Close dialog"
                        autoFocus
                        onClick={() => infoDialog.current.close()}
                    >
                        <Icon name="close" />
                    </button>
                    <span className="dialog-emblem">
                        <Icon name="pin" size={30} />
                    </span>
                    <h2 id={`${id}-dialog-title`}>{info.title}</h2>
                    <p>{info.text}</p>
                    <button
                        type="button"
                        className="button button--cyan"
                        onClick={() => infoDialog.current.close()}
                    >
                        Continue exploring <Icon name="arrow" size={16} />
                    </button>
                </div>
            </dialog>
        </>
    );
}
