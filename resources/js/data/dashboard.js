export const dashboardLinks = [
    { href: '/dashboard/profile', title: 'Edit profile', icon: 'users' },
    { href: '/dashboard/bookings', title: 'Bookings', icon: 'calendar' },
    { href: '/dashboard/reviews', title: 'Reviews', icon: 'star' },
    { href: '/dashboard/add-listing', title: 'Add listing', icon: 'plus' },
];

export const sampleBookings = [
    {
        id: 'EB-1001',
        guest: 'Alex Morgan',
        initials: 'AM',
        hotel: 'Premium Plaza Hotel',
        image: 'hotel-pool',
        date: '18 October 2026',
        checkIn: '12 Nov 2026',
        checkOut: '15 Nov 2026',
        guests: '2 adults',
        total: '$360',
        status: 'Confirmed',
    },
    {
        id: 'EB-1002',
        guest: 'Jamie Lee',
        initials: 'JL',
        hotel: 'Grand Royal Palace',
        image: 'hotel-room',
        date: '17 October 2026',
        checkIn: '20 Nov 2026',
        checkOut: '22 Nov 2026',
        guests: '2 adults · 1 child',
        total: '$190',
        status: 'Pending',
    },
    {
        id: 'EB-1003',
        guest: 'Taylor Reed',
        initials: 'TR',
        hotel: 'Park Central Hotel',
        image: 'hotel-city',
        date: '16 October 2026',
        checkIn: '04 Dec 2026',
        checkOut: '06 Dec 2026',
        guests: '1 adult',
        total: '$160',
        status: 'Cancelled',
    },
];

export const sampleReviews = [
    {
        id: 1,
        name: 'Alex Morgan',
        initials: 'AM',
        hotel: 'Premium Plaza Hotel',
        date: '18 October 2026',
        rating: '4.8',
        text: 'A peaceful spot for a city break. The room was bright and the welcome was warm.',
        scores: [
            'Cleanliness 5.0',
            'Comfort 4.5',
            'Location 5.0',
            'Facilities 4.5',
        ],
    },
    {
        id: 2,
        name: 'Jamie Lee',
        initials: 'JL',
        hotel: 'Grand Royal Palace',
        date: '16 October 2026',
        rating: '4.5',
        text: 'Comfortable rooms and a great location for exploring. We especially enjoyed the breakfast.',
        scores: [
            'Cleanliness 4.5',
            'Comfort 4.5',
            'Location 5.0',
            'Facilities 4.0',
        ],
    },
    {
        id: 3,
        name: 'Taylor Reed',
        initials: 'TR',
        hotel: 'Park Central Hotel',
        date: '12 October 2026',
        rating: '4.0',
        text: 'An easy check-in and a convenient base for our trip. A little more choice at breakfast would be welcome.',
        scores: [
            'Cleanliness 4.0',
            'Comfort 4.0',
            'Location 4.5',
            'Facilities 3.5',
        ],
    },
];

export function filterBookings(items, status) {
    return items.filter((item) => status === 'All' || item.status === status);
}

export function validatePreviewFiles(files) {
    if (files.length > 6) return 'Choose up to 6 images.';
    if (
        files.some(
            (file) =>
                !['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        )
    )
        return 'Choose JPEG, PNG, or WebP images only.';
    if (files.some((file) => file.size > 5 * 1024 * 1024))
        return 'Each image must be 5 MB or smaller.';
    return '';
}
