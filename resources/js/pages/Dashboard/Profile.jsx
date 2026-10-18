import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Icon from '../../components/Icon';
import PreviewImages from '../../components/PreviewImages';

export default function Profile() {
    const [message, setMessage] = useState('');
    return (
        <DashboardLayout title="Edit profile">
            <form
                className="preview-form"
                onSubmit={(event) => {
                    event.preventDefault();
                    setMessage(
                        'Profile preview updated on this page only. Nothing was saved to an account.',
                    );
                }}
            >
                <section className="dashboard-panel">
                    <h3>
                        <Icon name="users" size={19} />
                        Your profile
                    </h3>
                    <div className="dashboard-panel__body">
                        <div className="profile-fields">
                            <div className="form-grid">
                                <label htmlFor="profile-name">
                                    Your name <span>*</span>
                                    <input
                                        id="profile-name"
                                        required
                                        maxLength={100}
                                        defaultValue="Jamie Demo"
                                        autoComplete="off"
                                    />
                                </label>
                                <label htmlFor="profile-email">
                                    Email address <span>*</span>
                                    <input
                                        id="profile-email"
                                        type="email"
                                        required
                                        defaultValue="jamie@example.test"
                                        autoComplete="off"
                                    />
                                </label>
                                <label htmlFor="profile-phone">
                                    Phone
                                    <input
                                        id="profile-phone"
                                        type="tel"
                                        maxLength={30}
                                        placeholder="Your phone number"
                                        autoComplete="off"
                                    />
                                </label>
                                <label htmlFor="profile-address">
                                    Address
                                    <input
                                        id="profile-address"
                                        maxLength={200}
                                        placeholder="City, country"
                                        autoComplete="off"
                                    />
                                </label>
                                <label
                                    className="form-wide"
                                    htmlFor="profile-website"
                                >
                                    Website
                                    <input
                                        id="profile-website"
                                        type="url"
                                        placeholder="https://example.com"
                                    />
                                </label>
                                <label
                                    className="form-wide"
                                    htmlFor="profile-notes"
                                >
                                    Notes
                                    <textarea
                                        id="profile-notes"
                                        rows={5}
                                        maxLength={2000}
                                        placeholder="Tell us a little about yourself…"
                                    />
                                </label>
                            </div>
                            <PreviewImages single />
                        </div>
                    </div>
                </section>
                <section className="dashboard-panel">
                    <h3>
                        <Icon name="mail" size={19} />
                        Your socials
                    </h3>
                    <div className="dashboard-panel__body form-grid">
                        {[
                            'Facebook',
                            'Instagram',
                            'LinkedIn',
                            'Website / blog',
                        ].map((label, index) => (
                            <label key={label} htmlFor={`social-${index}`}>
                                {label}
                                <input
                                    id={`social-${index}`}
                                    type="url"
                                    placeholder="https://"
                                />
                            </label>
                        ))}
                    </div>
                </section>
                <div className="dashboard-form-footer">
                    <button type="submit" className="button button--cyan">
                        Preview profile changes <Icon name="check" size={16} />
                    </button>
                    <p className="form-message" role="status">
                        {message}
                    </p>
                </div>
            </form>
        </DashboardLayout>
    );
}
