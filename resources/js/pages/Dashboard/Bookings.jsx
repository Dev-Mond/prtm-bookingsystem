import { useRef, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Icon from '../../components/Icon';
import { filterBookings, sampleBookings } from '../../data/dashboard';

export default function Bookings() {
    const [status, setStatus] = useState('All');
    const [bookings, setBookings] = useState(sampleBookings);
    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState('');
    const dialog = useRef(null);
    const filtered = filterBookings(bookings, status);
    return (
        <DashboardLayout title="Bookings">
            <div className="dashboard-toolbar">
                <p role="status">
                    {filtered.length} sample{' '}
                    {filtered.length === 1 ? 'booking' : 'bookings'}
                </p>
                <label htmlFor="booking-filter">
                    Status{' '}
                    <select
                        id="booking-filter"
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                    >
                        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(
                            (value) => (
                                <option key={value}>{value}</option>
                            ),
                        )}
                    </select>
                </label>
            </div>
            <p className="form-message" role="status">
                {message}
            </p>
            <div className="booking-list">
                {filtered.map((booking) => (
                    <article
                        className="dashboard-panel booking-card"
                        key={booking.id}
                    >
                        <div className="booking-card__header">
                            <span className="review-avatar">
                                {booking.initials}
                            </span>
                            <div>
                                <h3>{booking.guest}</h3>
                                <p>
                                    {booking.date} · {booking.id}
                                </p>
                            </div>
                            <span
                                className={`booking-status booking-status--${booking.status.toLowerCase()}`}
                            >
                                {booking.status}
                            </span>
                        </div>
                        <div className="booking-card__body">
                            <img
                                src={`/images/travel/${booking.image}.jpg`}
                                alt="Sample property"
                                width="180"
                                height="140"
                                loading="lazy"
                            />
                            <div>
                                <p className="eyebrow">SAMPLE RESERVATION</p>
                                <h4>{booking.hotel}</h4>
                                <dl className="booking-facts">
                                    <div>
                                        <dt>Check in</dt>
                                        <dd>{booking.checkIn}</dd>
                                    </div>
                                    <div>
                                        <dt>Check out</dt>
                                        <dd>{booking.checkOut}</dd>
                                    </div>
                                    <div>
                                        <dt>Guests</dt>
                                        <dd>{booking.guests}</dd>
                                    </div>
                                    <div>
                                        <dt>Total (USD)</dt>
                                        <dd>{booking.total}</dd>
                                    </div>
                                </dl>
                                <button
                                    type="button"
                                    className="text-button"
                                    onClick={() => {
                                        setSelected(booking);
                                        dialog.current.showModal();
                                    }}
                                >
                                    View booking preview{' '}
                                    <Icon name="arrow" size={14} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="dashboard-panel empty-state">
                    <Icon name="calendar" size={32} />
                    <h3>No sample bookings with this status</h3>
                    <button
                        type="button"
                        className="text-button"
                        onClick={() => setStatus('All')}
                    >
                        Show all sample bookings
                    </button>
                </div>
            )}
            <dialog
                ref={dialog}
                className="site-dialog"
                aria-labelledby="booking-preview-title"
                onClick={(event) => {
                    if (event.target === event.currentTarget)
                        dialog.current.close();
                }}
            >
                <div className="site-dialog__content">
                    <button
                        type="button"
                        className="dialog-close"
                        autoFocus
                        aria-label="Close booking preview"
                        onClick={() => dialog.current.close()}
                    >
                        <Icon name="close" />
                    </button>
                    <span className="dialog-emblem">
                        <Icon name="calendar" size={28} />
                    </span>
                    <h2 id="booking-preview-title">Booking preview</h2>
                    {selected && (
                        <>
                            <h3>{selected.hotel}</h3>
                            <p>
                                {selected.id} · {selected.guest}
                                <br />
                                {selected.checkIn} – {selected.checkOut}
                                <br />
                                {selected.guests} · {selected.total} USD
                            </p>
                            <p className="preview-note">
                                This is a fictional booking. No payment or
                                reservation exists.
                            </p>
                            {selected.status !== 'Cancelled' && (
                                <button
                                    type="button"
                                    className="button button--yellow"
                                    onClick={() => {
                                        setBookings((items) =>
                                            items.map((item) =>
                                                item.id === selected.id
                                                    ? {
                                                          ...item,
                                                          status: 'Cancelled',
                                                      }
                                                    : item,
                                            ),
                                        );
                                        setMessage(
                                            `${selected.id} marked cancelled in this preview only. No real reservation was changed.`,
                                        );
                                        dialog.current.close();
                                        if (status !== 'All')
                                            document
                                                .getElementById(
                                                    'booking-filter',
                                                )
                                                ?.focus();
                                    }}
                                >
                                    Preview cancellation{' '}
                                    <Icon name="close" size={15} />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </dialog>
        </DashboardLayout>
    );
}
