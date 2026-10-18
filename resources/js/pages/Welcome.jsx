import { useRef, useState } from 'react';
import Icon from '../components/Icon';
import HotelSearch from '../components/HotelSearch';
import { destinations, filterStays, stays } from '../data/stays';
import PageLayout from '../layouts/PageLayout';

function SectionHeading({ title, text, light = false }) {
    return (
        <div
            className={`section-heading ${light ? 'section-heading--light' : ''}`}
        >
            <div className="heading-stars" aria-hidden="true">
                <Icon name="star" size={11} />
                <Icon name="star" size={15} />
                <Icon name="star" size={11} />
            </div>
            <h2>{title}</h2>
            <span className="heading-line" />
            <p>{text}</p>
        </div>
    );
}

function HotelCard({ stay, saved, onSave, onOpen }) {
    return (
        <article className="hotel-card">
            <div className="hotel-card__image">
                <button
                    className="hotel-card__photo"
                    type="button"
                    onClick={() => onOpen(stay)}
                    aria-label={`Preview ${stay.name}`}
                >
                    <img
                        src={stay.image}
                        alt={`${stay.category} in ${stay.city}`}
                        width="600"
                        height="400"
                        loading="lazy"
                    />
                </button>
                <span className="hotel-card__label">{stay.label}</span>
                <button
                    className={`hotel-save ${saved ? 'is-saved' : ''}`}
                    type="button"
                    aria-label={`${saved ? 'Remove' : 'Save'} ${stay.name}${saved ? ' from favorites' : ''}`}
                    aria-pressed={saved}
                    onClick={() => onSave(stay.id)}
                >
                    <Icon name="heart" size={19} />
                </button>
                <div
                    className="hotel-stars"
                    aria-label={`${stay.stars} out of 5 stars`}
                >
                    {Array.from({ length: stay.stars }, (_, index) => (
                        <Icon key={index} name="star" size={12} />
                    ))}
                </div>
            </div>
            <div className="hotel-card__body">
                <div className="hotel-card__rating">
                    <span>{stay.rating}</span>
                    <div>
                        <strong>Excellent</strong>
                        <small>{stay.reviews} reviews</small>
                    </div>
                    <span className="verified-mark" title="Sample listing">
                        <Icon name="check" size={12} />
                    </span>
                </div>
                <h3>
                    <button type="button" onClick={() => onOpen(stay)}>
                        {stay.name}
                    </button>
                </h3>
                <p className="hotel-address">
                    <Icon name="pin" size={13} />
                    {stay.address}
                </p>
                <p className="hotel-description">
                    A welcoming stay with thoughtful details, comfortable rooms,
                    and the city on your doorstep.
                </p>
                <div className="hotel-amenities" aria-label="Sample amenities">
                    <span title="Free Wi-Fi">
                        <Icon name="wifi" size={18} />
                        <span className="sr-only">Wi-Fi</span>
                    </span>
                    <span title="Breakfast">
                        <Icon name="coffee" size={17} />
                        <span className="sr-only">Breakfast</span>
                    </span>
                    <span title="Comfortable rooms">
                        <Icon name="bed" size={18} />
                        <span className="sr-only">Comfortable rooms</span>
                    </span>
                    <span className="hotel-category">{stay.category}</span>
                </div>
            </div>
            <div className="hotel-card__footer">
                <span>
                    From <strong>${stay.price}</strong>
                    <small> / night</small>
                </span>
                <button type="button" onClick={() => onOpen(stay)}>
                    View details <Icon name="arrow" size={14} />
                </button>
            </div>
        </article>
    );
}

const articles = [
    {
        title: 'A little guide to a great city escape',
        category: 'Travel tips',
        image: 'rome',
        text: 'Leave room in your itinerary for the unexpected. Explore a neighborhood on foot, find a local café, and pick a stay close to the places you want to discover. A short trip can still feel like a real escape.',
    },
    {
        title: 'The places that make you stay a little longer',
        category: 'Destinations',
        image: 'paris',
        text: 'Some cities invite you to slow down. Find a quiet street, an open-air market, or a view you cannot stop looking at. A comfortable place to come home to makes those little discoveries even better.',
    },
    {
        title: 'Your next unforgettable stay starts here',
        category: 'Hotel inspiration',
        image: 'hotel-pool',
        text: 'Think about what makes a stay special for you: a peaceful pool, a room with a view, or breakfast in the sunshine. Start with the experience you want, then find the destination that brings it to life.',
    },
];

export default function Welcome() {
    const [query, setQuery] = useState('');
    const [saved, setSaved] = useState([]);
    const [onlySaved, setOnlySaved] = useState(false);
    const [searched, setSearched] = useState(false);
    const [selected, setSelected] = useState(null);
    const previewDialog = useRef(null);
    const results = filterStays(stays, query).filter(
        (stay) => !onlySaved || saved.includes(stay.id),
    );

    function showResults(nextQuery = '', savedOnly = false) {
        setQuery(nextQuery);
        setOnlySaved(savedOnly);
        setSearched(true);
        document.getElementById('hotels')?.scrollIntoView({ block: 'start' });
    }

    function toggleSave(id) {
        setSaved((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    }

    function openPreview(item) {
        setSelected(item);
        previewDialog.current.showModal();
    }

    return (
        <PageLayout
            title="Find your perfect stay"
            savedCount={saved.length}
            onShowSaved={() => showResults('', true)}
        >
            <section
                className="booking-hero"
                id="search"
                aria-labelledby="hero-heading"
            >
                <div className="hero-collage" aria-hidden="true">
                    {[
                        'travel',
                        'new-york',
                        'rome',
                        'hotel-room',
                        'hotel-pool',
                        'paris',
                        'london',
                        'dubai',
                    ].map((photo, index) => (
                        <img
                            key={photo}
                            className={`collage-${index + 1}`}
                            src={`/images/travel/${photo}.jpg`}
                            alt=""
                            width="800"
                            height="600"
                            fetchPriority={index < 4 ? 'high' : 'auto'}
                        />
                    ))}
                </div>
                <div className="hero-shade" />
                <div className="container booking-hero__content">
                    <div
                        className="heading-stars hero-stars"
                        aria-hidden="true"
                    >
                        <Icon name="star" size={12} />
                        <Icon name="star" size={17} />
                        <Icon name="star" size={12} />
                    </div>
                    <h1 id="hero-heading">EasyBook Hotel Booking System</h1>
                    <span className="heading-line" />
                    <p>
                        Let's start exploring the world together with EasyBook
                    </p>
                    <HotelSearch
                        onSearch={({ query: nextQuery }) =>
                            showResults(nextQuery)
                        }
                    />
                </div>
                <a
                    className="hero-scroll"
                    href="#destinations"
                    aria-label="Explore popular destinations"
                >
                    <span>⌄</span>
                    <span>⌄</span>
                </a>
            </section>

            <section
                className="destinations-section section-space"
                id="destinations"
            >
                <SectionHeading
                    title="Popular Destination"
                    text="A world of places to discover. Find the city that feels like your next adventure."
                />
                <div className="destination-grid">
                    {destinations.map((destination) => (
                        <button
                            className={`destination-card ${destination.wide ? 'destination-card--wide' : ''}`}
                            type="button"
                            key={destination.city}
                            onClick={() => showResults(destination.city)}
                            aria-label={`Explore sample stays in ${destination.city}`}
                        >
                            <img
                                src={destination.image}
                                alt={`${destination.city}, ${destination.country}`}
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                            <span className="destination-card__shade" />
                            <span className="destination-count">
                                <strong>{destination.count}</strong> Hotels
                            </span>
                            <span className="destination-card__text">
                                <span className="destination-card__name">
                                    {destination.city}
                                </span>
                                <span className="destination-country">
                                    <Icon name="pin" size={13} />
                                    {destination.country}
                                </span>
                                <span className="destination-caption">
                                    Find a new favorite place to call home.
                                </span>
                            </span>
                            <span className="destination-arrow">
                                <Icon name="arrow" size={17} />
                            </span>
                        </button>
                    ))}
                </div>
                <div className="section-action">
                    <button
                        className="button button--cyan"
                        type="button"
                        onClick={() => showResults()}
                    >
                        Explore All Destinations <Icon name="arrow" size={16} />
                    </button>
                </div>
            </section>

            <section className="hotel-section section-space" id="hotels">
                <div className="container">
                    <SectionHeading
                        title={
                            onlySaved
                                ? 'Your Saved Hotels'
                                : 'Recently Added Hotels'
                        }
                        text="Handpicked places, thoughtful comforts, and a warm welcome wherever you go."
                    />
                    <div className="listing-toolbar">
                        <div>
                            <span className="collection-label">
                                THE COLLECTION
                            </span>
                            <p>Sample stays · Reservations open soon</p>
                        </div>
                        <button
                            type="button"
                            className="collection-filter"
                            onClick={() => {
                                setOnlySaved(!onlySaved);
                                setSearched(true);
                            }}
                            aria-pressed={onlySaved}
                        >
                            <Icon name="heart" size={16} />
                            {onlySaved
                                ? 'Show all hotels'
                                : `Saved hotels (${saved.length})`}
                        </button>
                    </div>
                    <p className="results-summary" aria-live="polite">
                        {searched
                            ? `${results.length} sample ${results.length === 1 ? 'stay' : 'stays'}${query ? ` matching “${query}”` : onlySaved ? ' saved for this visit' : ' to explore'}.`
                            : 'Find your next great stay.'}
                    </p>
                    {results.length ? (
                        <div className="hotel-grid">
                            {results.map((stay) => (
                                <HotelCard
                                    key={stay.id}
                                    stay={stay}
                                    saved={saved.includes(stay.id)}
                                    onSave={toggleSave}
                                    onOpen={openPreview}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-stays">
                            <Icon
                                name={onlySaved ? 'heart' : 'search'}
                                size={34}
                            />
                            <h3>
                                {onlySaved
                                    ? 'Your next favorite is out there.'
                                    : 'No sample stays found.'}
                            </h3>
                            <p>
                                {onlySaved
                                    ? 'Tap the heart on a hotel to save it while you explore.'
                                    : 'Try Paris, Rome, London, Dubai, or New York.'}
                            </p>
                            <button
                                className="button button--cyan"
                                type="button"
                                onClick={() => showResults()}
                            >
                                Browse all hotels{' '}
                                <Icon name="arrow" size={16} />
                            </button>
                        </div>
                    )}
                    <div className="section-action">
                        <button
                            className="button button--yellow"
                            type="button"
                            onClick={() => showResults()}
                        >
                            View All Hotels <Icon name="arrow" size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="popular-banner">
                <img
                    src="/images/travel/hotel-pool.jpg"
                    alt="Poolside hotel with palm trees"
                    width="1600"
                    height="700"
                    loading="lazy"
                />
                <div className="popular-banner__shade" />
                <div className="container popular-banner__content">
                    <span className="eyebrow">The art of getting away</span>
                    <h2>Most Popular Hotels</h2>
                    <p>
                        Some places are more than a stay. They're the beginning
                        of a story you'll want to tell.
                    </p>
                    <a href="#hotels" className="button button--yellow">
                        Discover the Collection <Icon name="arrow" size={16} />
                    </a>
                    <div className="banner-stats">
                        <span>
                            <strong>5</strong> Inspiring destinations
                        </span>
                        <span>
                            <strong>6</strong> Sample stays to explore
                        </span>
                        <span>
                            <strong>∞</strong> Possibilities ahead
                        </span>
                    </div>
                </div>
            </section>

            <section className="why-section section-space" id="why-us">
                <div className="container">
                    <SectionHeading
                        title="Why Choose Us"
                        text="Spend less time planning and more time looking forward to your next trip."
                    />
                    <div className="benefit-grid">
                        {[
                            {
                                icon: 'support',
                                title: 'A more personal experience',
                                text: 'Discover places with character and thoughtful touches that make a trip your own.',
                            },
                            {
                                icon: 'shield',
                                title: 'Find the right fit',
                                text: 'Explore different styles of stays, from quiet hideaways to the heart of the city.',
                            },
                            {
                                icon: 'pin',
                                title: 'Your world, a little closer',
                                text: 'Start with a destination you love or find somewhere new to fall in love with.',
                            },
                        ].map((benefit, index) => (
                            <article
                                className="benefit-card"
                                key={benefit.title}
                            >
                                <span className="benefit-icon">
                                    <Icon name={benefit.icon} size={36} />
                                </span>
                                <span className="benefit-number">
                                    0{index + 1}
                                </span>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="app-banner">
                <div className="container app-banner__inner">
                    <div>
                        <span className="eyebrow">
                            A little inspiration, wherever you are
                        </span>
                        <h2>
                            Find your next stay.
                            <br />
                            Take the world with you.
                        </h2>
                        <p>
                            Explore destinations and save your favorites right
                            from your phone. Our mobile app is coming soon.
                        </p>
                        <a href="#search" className="button button--white">
                            <Icon name="phone" /> Explore on the web{' '}
                            <Icon name="arrow" size={15} />
                        </a>
                    </div>
                    <div className="phone-preview" aria-hidden="true">
                        <div className="phone-notch" />
                        <div className="phone-screen">
                            <span className="phone-brand">
                                EASY<strong>BOOK</strong>
                            </span>
                            <img
                                src="/images/travel/paris.jpg"
                                alt=""
                                width="300"
                                height="280"
                                loading="lazy"
                            />
                            <div className="phone-screen__content">
                                <small>YOUR NEXT ADVENTURE</small>
                                <strong>Bonjour, Paris.</strong>
                                <span>Find your perfect stay</span>
                                <div className="phone-search">
                                    <Icon name="search" size={14} /> Where are
                                    you going?
                                </div>
                                <div className="phone-mini-card">
                                    <img
                                        src="/images/travel/hotel-room.jpg"
                                        alt=""
                                        loading="lazy"
                                        width="70"
                                        height="60"
                                    />
                                    <span>
                                        A place to unwind<small>★★★★★</small>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="testimonials-section section-space">
                <div className="container">
                    <SectionHeading
                        title="A Stay to Remember"
                        text="Good places, small discoveries, and the things that make getting away feel special."
                    />
                    <div className="story-grid">
                        {[
                            {
                                initials: 'JD',
                                title: 'A little room to slow down',
                                text: 'A quiet morning, a good coffee, and a city waiting outside. Sometimes, the best itinerary is simply to see where the day takes you.',
                                label: 'City escapes',
                            },
                            {
                                initials: 'AM',
                                title: 'Closer to the moments that matter',
                                text: 'Whether it is a weekend for two or a new place with old friends, the right stay gives you more time for the good part of travel.',
                                label: 'Travel together',
                            },
                            {
                                initials: 'SK',
                                title: 'Somewhere worth coming back to',
                                text: 'Beautiful surroundings are just the beginning. It is the thoughtful details and feeling of being welcome that stay with you.',
                                label: 'Places we love',
                            },
                        ].map((story) => (
                            <article
                                className="travel-story"
                                key={story.initials}
                            >
                                <span className="story-avatar">
                                    {story.initials}
                                </span>
                                <span
                                    className="story-quote"
                                    aria-hidden="true"
                                >
                                    “
                                </span>
                                <h3>{story.title}</h3>
                                <p>{story.text}</p>
                                <span className="story-label">
                                    {story.label}
                                </span>
                            </article>
                        ))}
                    </div>
                    <div className="carousel-dots" aria-hidden="true">
                        <span />
                        <span className="is-active" />
                        <span />
                    </div>
                </div>
            </section>

            <section className="host-banner">
                <img
                    src="/images/travel/london.jpg"
                    alt="London cityscape"
                    width="1600"
                    height="700"
                    loading="lazy"
                />
                <div className="host-banner__shade" />
                <div className="container">
                    <span className="eyebrow">
                        Great places deserve to be discovered
                    </span>
                    <h2>The owner of a hotel or business?</h2>
                    <p>
                        Be part of a collection that brings travelers and
                        remarkable places together.
                    </p>
                    <button
                        className="button button--yellow"
                        type="button"
                        onClick={() =>
                            openPreview({
                                title: 'Your property, a new perspective',
                                text: 'Our partner program is coming soon. Discover the sample collection and imagine your place among the stays travelers will love.',
                            })
                        }
                    >
                        List Your Property <Icon name="plus" size={16} />
                    </button>
                </div>
            </section>

            <section className="journal-section section-space" id="journal">
                <div className="container">
                    <SectionHeading
                        title="Tips & Articles"
                        text="A little local knowledge. A fresh perspective. Inspiration for the journey ahead."
                    />
                    <div className="journal-grid">
                        {articles.map((article) => (
                            <article
                                className="journal-card"
                                key={article.title}
                            >
                                <button
                                    type="button"
                                    className="journal-image"
                                    onClick={() => openPreview(article)}
                                    aria-label={`Read ${article.title}`}
                                >
                                    <img
                                        src={`/images/travel/${article.image}.jpg`}
                                        alt={article.category}
                                        width="600"
                                        height="400"
                                        loading="lazy"
                                    />
                                    <span>{article.category}</span>
                                </button>
                                <div className="journal-card__body">
                                    <small>
                                        <Icon name="calendar" size={13} /> THE
                                        TRAVEL JOURNAL
                                    </small>
                                    <h3>
                                        <button
                                            type="button"
                                            onClick={() => openPreview(article)}
                                        >
                                            {article.title}
                                        </button>
                                    </h3>
                                    <p>{article.text.slice(0, 110)}…</p>
                                    <button
                                        className="text-link"
                                        type="button"
                                        onClick={() => openPreview(article)}
                                    >
                                        Read more{' '}
                                        <Icon name="arrow" size={14} />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <dialog
                ref={previewDialog}
                className="site-dialog listing-dialog"
                aria-labelledby="preview-title"
                onClick={(event) => {
                    if (event.target === event.currentTarget)
                        previewDialog.current.close();
                }}
            >
                <div className="site-dialog__content">
                    <button
                        className="dialog-close"
                        type="button"
                        autoFocus
                        aria-label="Close preview"
                        onClick={() => previewDialog.current.close()}
                    >
                        <Icon name="close" />
                    </button>
                    {selected?.id ? (
                        <>
                            <img
                                className="listing-dialog__image"
                                src={selected.image}
                                alt={selected.name}
                            />
                            <span className="collection-label">
                                {selected.category} · {selected.city}
                            </span>
                            <h2 id="preview-title">{selected.name}</h2>
                            <p>
                                <Icon name="pin" size={15} /> {selected.address}
                            </p>
                            <p>
                                A comfortable base for your next adventure, with
                                inviting rooms and a great location.
                            </p>
                            <div className="listing-dialog__price">
                                From <strong>${selected.price}</strong> / night
                            </div>
                            <p className="preview-notice">
                                Sample listing. Reservations and live
                                availability are coming soon.
                            </p>
                        </>
                    ) : (
                        <>
                            <span className="dialog-emblem">
                                <Icon name="pin" size={30} />
                            </span>
                            <h2 id="preview-title">{selected?.title}</h2>
                            <p>{selected?.text}</p>
                        </>
                    )}
                    <button
                        className="button button--cyan"
                        type="button"
                        onClick={() => previewDialog.current.close()}
                    >
                        Continue exploring <Icon name="arrow" size={16} />
                    </button>
                </div>
            </dialog>
        </PageLayout>
    );
}
