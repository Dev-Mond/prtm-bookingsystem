import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Icon from '../../components/Icon';
import PreviewImages from '../../components/PreviewImages';

export default function AddListing() {
    const [message, setMessage] = useState('');
    return (
        <DashboardLayout title="Add listing">
            <form
                className="preview-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setMessage(
                        'Listing preview validated. Nothing was published, uploaded, or saved.',
                    );
                }}
            >
                <section className="dashboard-panel">
                    <h3>
                        <span className="panel-step">01</span>Basic information
                        <Icon name="bed" size={19} />
                    </h3>
                    <div className="dashboard-panel__body form-grid">
                        <label className="form-wide" htmlFor="listing-title">
                            Hotel title <span>*</span>
                            <input
                                id="listing-title"
                                required
                                maxLength={150}
                                placeholder="Name of your property"
                            />
                        </label>
                        <label htmlFor="listing-type">
                            Type / category <span>*</span>
                            <select id="listing-type" required defaultValue="">
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option>Hotel</option>
                                <option>Apartment</option>
                                <option>Guest house</option>
                                <option>Resort</option>
                            </select>
                        </label>
                        <label htmlFor="listing-keywords">
                            Keywords
                            <input
                                id="listing-keywords"
                                maxLength={200}
                                placeholder="Beach, family, city break…"
                            />
                        </label>
                    </div>
                </section>
                <section className="dashboard-panel">
                    <h3>
                        <span className="panel-step">02</span>Location /
                        contacts
                        <Icon name="pin" size={19} />
                    </h3>
                    <div className="dashboard-panel__body form-grid">
                        <label className="form-wide" htmlFor="listing-address">
                            Address <span>*</span>
                            <input
                                id="listing-address"
                                required
                                maxLength={250}
                                placeholder="Street and building number"
                            />
                        </label>
                        <label htmlFor="listing-city">
                            City / location <span>*</span>
                            <input
                                id="listing-city"
                                required
                                maxLength={100}
                                placeholder="City"
                            />
                        </label>
                        <label htmlFor="listing-country">
                            Country <span>*</span>
                            <input
                                id="listing-country"
                                required
                                maxLength={100}
                                placeholder="Country"
                            />
                        </label>
                        <label htmlFor="listing-email">
                            Email address <span>*</span>
                            <input
                                id="listing-email"
                                type="email"
                                required
                                placeholder="hello@example.test"
                            />
                        </label>
                        <label htmlFor="listing-phone">
                            Phone
                            <input
                                id="listing-phone"
                                type="tel"
                                maxLength={30}
                            />
                        </label>
                        <label className="form-wide" htmlFor="listing-website">
                            Website
                            <input
                                id="listing-website"
                                type="url"
                                placeholder="https://"
                            />
                        </label>
                        <div className="location-preview form-wide">
                            <Icon name="pin" size={30} />
                            <strong>Your property location</strong>
                            <span>
                                Interactive maps and geocoding are not connected
                                in this preview.
                            </span>
                        </div>
                    </div>
                </section>
                <section className="dashboard-panel">
                    <h3>
                        <span className="panel-step">03</span>Header media
                        <Icon name="plus" size={19} />
                    </h3>
                    <div className="dashboard-panel__body">
                        <PreviewImages />
                    </div>
                </section>
                <section className="dashboard-panel">
                    <h3>
                        <span className="panel-step">04</span>Details
                        <Icon name="menu" size={19} />
                    </h3>
                    <div className="dashboard-panel__body form-grid">
                        <label
                            className="form-wide"
                            htmlFor="listing-description"
                        >
                            Description <span>*</span>
                            <textarea
                                id="listing-description"
                                required
                                minLength={20}
                                maxLength={5000}
                                rows={6}
                                placeholder="Describe your property, surroundings, and what makes it special (at least 20 characters)."
                            />
                        </label>
                        <label htmlFor="listing-price">
                            Nightly price (USD) <span>*</span>
                            <input
                                id="listing-price"
                                type="number"
                                required
                                min="1"
                                max="100000"
                                step="0.01"
                                placeholder="120.00"
                            />
                        </label>
                        <label htmlFor="listing-rooms">
                            Number of rooms <span>*</span>
                            <input
                                id="listing-rooms"
                                type="number"
                                min="1"
                                max="10000"
                                step="1"
                                required
                                placeholder="10"
                            />
                        </label>
                        <fieldset className="form-wide facilities">
                            <legend>Facilities</legend>
                            {[
                                'Free WiFi',
                                'Parking',
                                'Fitness center',
                                'Non-smoking rooms',
                                'Airport shuttle',
                                'Air conditioning',
                                'Swimming pool',
                                'Restaurant',
                            ].map((facility) => (
                                <label className="check-label" key={facility}>
                                    <input type="checkbox" />
                                    {facility}
                                </label>
                            ))}
                        </fieldset>
                    </div>
                </section>
                <div className="dashboard-form-footer">
                    <button className="button button--cyan" type="submit">
                        Preview listing <Icon name="check" size={16} />
                    </button>
                    <p className="form-message" role="status">
                        {message}
                    </p>
                </div>
            </form>
        </DashboardLayout>
    );
}
