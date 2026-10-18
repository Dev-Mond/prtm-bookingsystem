import { useId, useState } from 'react';
import Icon from './Icon';

export default function HotelSearch({ onSearch }) {
    const id = useId();
    const [query, setQuery] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [datesOpen, setDatesOpen] = useState(false);
    const [guestsOpen, setGuestsOpen] = useState(false);
    const localToday = new Date().toLocaleDateString('en-CA');

    function submit(event) {
        event.preventDefault();
        setDatesOpen(false);
        setGuestsOpen(false);
        onSearch({ query, checkIn, checkOut, adults, children });
    }

    return (
        <form
            className="hotel-search"
            aria-label="Find a hotel"
            onSubmit={submit}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    setDatesOpen(false);
                    setGuestsOpen(false);
                    event.target
                        .closest('.search-dropdown')
                        ?.querySelector('.search-field')
                        ?.focus();
                }
            }}
        >
            <div className="hotel-search__location">
                <Icon name="pin" />
                <label className="sr-only" htmlFor={`${id}-destination`}>
                    Hotel or city
                </label>
                <input
                    id={`${id}-destination`}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Hotel, City..."
                    autoComplete="off"
                    list={`${id}-cities`}
                />
                <datalist id={`${id}-cities`}>
                    {['Rome', 'Paris', 'London', 'Dubai', 'New York'].map(
                        (city) => (
                            <option key={city} value={city} />
                        ),
                    )}
                </datalist>
                <span className="location-target" aria-hidden="true">
                    ◎
                </span>
            </div>
            <div className="search-dropdown date-picker">
                <button
                    className="search-field"
                    type="button"
                    aria-expanded={datesOpen}
                    aria-controls={`${id}-dates`}
                    onClick={() => {
                        setDatesOpen(!datesOpen);
                        setGuestsOpen(false);
                    }}
                >
                    <Icon name="calendar" />
                    <span>
                        {checkIn
                            ? `${checkIn.slice(5)}${checkOut ? ` — ${checkOut.slice(5)}` : ''}`
                            : 'When'}
                    </span>
                    <Icon name="chevron" size={14} />
                </button>
                <div
                    id={`${id}-dates`}
                    className="search-popover"
                    hidden={!datesOpen}
                >
                    <label htmlFor={`${id}-in`}>Check in</label>
                    <input
                        id={`${id}-in`}
                        type="date"
                        min={localToday}
                        value={checkIn}
                        onChange={(event) => {
                            setCheckIn(event.target.value);
                            if (checkOut && event.target.value >= checkOut)
                                setCheckOut('');
                        }}
                    />
                    <label htmlFor={`${id}-out`}>Check out</label>
                    <input
                        id={`${id}-out`}
                        type="date"
                        min={checkIn || localToday}
                        value={checkOut}
                        onChange={(event) => setCheckOut(event.target.value)}
                    />
                    <button
                        type="button"
                        className="popover-done"
                        onClick={() => setDatesOpen(false)}
                    >
                        Done <Icon name="check" size={14} />
                    </button>
                </div>
            </div>
            <div className="search-dropdown guest-picker">
                <button
                    className="search-field"
                    type="button"
                    aria-expanded={guestsOpen}
                    aria-controls={`${id}-guests`}
                    onClick={() => {
                        setGuestsOpen(!guestsOpen);
                        setDatesOpen(false);
                    }}
                >
                    <Icon name="users" />
                    <span>{adults + children} Persons</span>
                    <Icon name="chevron" size={14} />
                </button>
                <div
                    id={`${id}-guests`}
                    className="search-popover"
                    hidden={!guestsOpen}
                >
                    {[
                        {
                            label: 'Adults',
                            value: adults,
                            set: setAdults,
                            min: 1,
                            max: 10,
                        },
                        {
                            label: 'Children',
                            value: children,
                            set: setChildren,
                            min: 0,
                            max: 6,
                        },
                    ].map(({ label, value, set, min, max }) => (
                        <div className="guest-counter" key={label}>
                            <span>{label}</span>
                            <div>
                                <button
                                    type="button"
                                    aria-label={`Fewer ${label.toLowerCase()}`}
                                    disabled={value <= min}
                                    onClick={() => set(value - 1)}
                                >
                                    <Icon name="minus" size={13} />
                                </button>
                                <output aria-live="polite" aria-label={label}>
                                    {value}
                                </output>
                                <button
                                    type="button"
                                    aria-label={`More ${label.toLowerCase()}`}
                                    disabled={value >= max}
                                    onClick={() => set(value + 1)}
                                >
                                    <Icon name="plus" size={13} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        className="popover-done"
                        type="button"
                        onClick={() => setGuestsOpen(false)}
                    >
                        Done <Icon name="check" size={14} />
                    </button>
                </div>
            </div>
            <button className="hotel-search__submit" type="submit">
                Search <Icon name="search" />
            </button>
        </form>
    );
}
