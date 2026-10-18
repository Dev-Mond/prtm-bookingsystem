const paths = {
    pin: (
        <>
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </>
    ),
    search: (
        <>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
        </>
    ),
    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M7 3v4m10-4v4M3 11h18m-14 5h3m4 0h3" />
        </>
    ),
    users: (
        <>
            <circle cx="9" cy="7" r="3" />
            <path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m3 11v-3a6 6 0 0 0-2-4" />
        </>
    ),
    heart: (
        <path d="M20.5 5.5a5.3 5.3 0 0 0-7.5 0L12 6.6l-1.1-1.1a5.3 5.3 0 0 0-7.4 7.5L12 21l8.5-8a5.3 5.3 0 0 0 0-7.5Z" />
    ),
    home: (
        <>
            <path d="m3 11 9-8 9 8M5 10v11h14V10" />
            <path d="M9 21v-8h6v8" />
        </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    check: <path d="m5 12 4 4L19 6" />,
    login: (
        <>
            <path d="M14 4h6v16h-6M3 12h12m-5-5 5 5-5 5" />
        </>
    ),
    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 6 9 7 9-7" />
        </>
    ),
    shield: (
        <>
            <path d="m12 3 9 4v6c0 5-9 9-9 9s-9-4-9-9V7Z" />
            <path d="m8 12 3 3 5-5" />
        </>
    ),
    support: (
        <>
            <path d="M4 13v-2a8 8 0 0 1 16 0v7c0 3-4 3-7 3" />
            <rect x="2" y="11" width="4" height="7" rx="2" />
            <rect x="18" y="11" width="4" height="7" rx="2" />
        </>
    ),
    bed: (
        <>
            <path d="M3 19V7m18 12V9M3 15h18M7 9h4v6M3 19v3m18-3v3" />
            <rect x="11" y="9" width="10" height="6" rx="1" />
        </>
    ),
    wifi: (
        <>
            <path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0" />
            <circle cx="12" cy="20" r=".8" />
        </>
    ),
    coffee: (
        <>
            <path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Zm12 1h2a3 3 0 0 1 0 6h-2M8 2v3m4-3v3M2 22h18" />
        </>
    ),
    phone: (
        <>
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M10 18h4" />
        </>
    ),
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" />,
    play: <path d="m9 5 11 7-11 7Z" />,
};

export default function Icon({ name, size = 18, className = '', ...props }) {
    return (
        <svg
            aria-hidden="true"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`icon ${className}`}
            {...props}
        >
            {paths[name] || paths.pin}
        </svg>
    );
}
