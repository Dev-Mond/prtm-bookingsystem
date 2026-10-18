const photo = (name) => `/images/travel/${name}.jpg`;

export const destinations = [
    { city: 'Rome', country: 'Italy', count: 79, image: photo('rome') },
    {
        city: 'Paris',
        country: 'France',
        count: 43,
        image: photo('paris'),
        wide: true,
    },
    {
        city: 'London',
        country: 'United Kingdom',
        count: 23,
        image: photo('london'),
    },
    {
        city: 'Dubai',
        country: 'United Arab Emirates',
        count: 57,
        image: photo('dubai'),
    },
    {
        city: 'New York',
        country: 'United States',
        count: 35,
        image: photo('new-york'),
    },
];

export const stays = [
    {
        id: 'plaza',
        name: 'Premium Plaza Hotel',
        city: 'Paris',
        address: '12 Rue de la Paix, Paris, France',
        price: 120,
        rating: '4.8',
        reviews: 36,
        stars: 5,
        image: photo('hotel-pool'),
        label: 'Featured',
        category: 'Luxury hotel',
    },
    {
        id: 'palace',
        name: 'Grand Royal Palace',
        city: 'Rome',
        address: 'Via Veneto, Rome, Italy',
        price: 95,
        rating: '4.9',
        reviews: 48,
        stars: 5,
        image: photo('hotel-room'),
        label: 'Best rated',
        category: 'Boutique hotel',
    },
    {
        id: 'central',
        name: 'Park Central Hotel',
        city: 'London',
        address: 'Kensington Gardens, London, UK',
        price: 80,
        rating: '4.7',
        reviews: 24,
        stars: 4,
        image: photo('hotel-city'),
        label: 'Popular',
        category: 'City hotel',
    },
    {
        id: 'holiday',
        name: 'The Holiday House',
        city: 'New York',
        address: '75 Prince Street, New York, USA',
        price: 105,
        rating: '4.6',
        reviews: 19,
        stars: 4,
        image: photo('hotel-room'),
        label: 'New',
        category: 'Apartment',
    },
    {
        id: 'gold',
        name: 'Golden Palm Resort',
        city: 'Dubai',
        address: 'Palm Jumeirah, Dubai, UAE',
        price: 160,
        rating: '4.9',
        reviews: 52,
        stars: 5,
        image: photo('hotel-pool'),
        label: 'Featured',
        category: 'Resort',
    },
    {
        id: 'moonlight',
        name: 'Maison Moonlight',
        city: 'Paris',
        address: '18 Avenue de la Bourdonnais, Paris, France',
        price: 110,
        rating: '4.8',
        reviews: 31,
        stars: 4,
        image: photo('hotel-city'),
        label: 'Recommended',
        category: 'Boutique hotel',
    },
];

export function filterStays(items, query) {
    const term = query.trim().toLowerCase();

    return items.filter((stay) =>
        `${stay.name} ${stay.city}`.toLowerCase().includes(term),
    );
}
