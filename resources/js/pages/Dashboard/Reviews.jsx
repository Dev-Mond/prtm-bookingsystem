import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Icon from '../../components/Icon';
import { sampleReviews } from '../../data/dashboard';

export default function Reviews() {
    const [replying, setReplying] = useState(null);
    const [replies, setReplies] = useState({});
    return (
        <DashboardLayout title="Reviews">
            <div className="review-summary">
                <span className="review-summary__score">
                    4.4 <small>/ 5</small>
                </span>
                <div>
                    <h3>Very good</h3>
                    <p>
                        Based on 3 fictional reviews · Sample property feedback
                    </p>
                    <span
                        className="review-stars"
                        aria-label="4.4 out of 5 stars"
                    >
                        ★★★★★
                    </span>
                </div>
                <Icon name="star" size={42} />
            </div>
            <div className="review-list">
                {sampleReviews.map((review) => (
                    <article
                        className="dashboard-panel review-card"
                        key={review.id}
                    >
                        <div className="review-card__header">
                            <span className="review-avatar">
                                {review.initials}
                            </span>
                            <div>
                                <h3>
                                    {review.name} <span>on</span> {review.hotel}
                                </h3>
                                <p>{review.date} · Sample review</p>
                            </div>
                            <span className="review-rating">
                                {review.rating}
                                <small> / 5</small>
                            </span>
                        </div>
                        <div className="dashboard-panel__body">
                            <ul className="review-scores">
                                {review.scores.map((score) => (
                                    <li key={score}>{score}</li>
                                ))}
                            </ul>
                            <p className="review-text">{review.text}</p>
                            {replies[review.id] && (
                                <div className="review-reply">
                                    <strong>Your local preview reply</strong>
                                    <p>{replies[review.id]}</p>
                                    <small>Not posted or sent.</small>
                                </div>
                            )}
                            <button
                                id={`reply-trigger-${review.id}`}
                                type="button"
                                className="text-button"
                                aria-expanded={replying === review.id}
                                aria-controls={`reply-${review.id}`}
                                onClick={() =>
                                    setReplying(
                                        replying === review.id
                                            ? null
                                            : review.id,
                                    )
                                }
                            >
                                <Icon name="mail" size={15} />
                                {replies[review.id]
                                    ? 'Edit preview reply'
                                    : 'Reply preview'}
                            </button>
                            <form
                                id={`reply-${review.id}`}
                                className="preview-form reply-form"
                                hidden={replying !== review.id}
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const text = new FormData(
                                        event.currentTarget,
                                    )
                                        .get('reply')
                                        .trim();
                                    if (!text) {
                                        event.currentTarget.elements.reply.setCustomValidity(
                                            'Enter a reply, not just spaces.',
                                        );
                                        event.currentTarget.elements.reply.reportValidity();
                                        return;
                                    }
                                    setReplies((current) => ({
                                        ...current,
                                        [review.id]: text,
                                    }));
                                    setReplying(null);
                                    document
                                        .getElementById(
                                            `reply-trigger-${review.id}`,
                                        )
                                        ?.focus();
                                }}
                            >
                                <label htmlFor={`reply-text-${review.id}`}>
                                    Your reply
                                    <textarea
                                        id={`reply-text-${review.id}`}
                                        name="reply"
                                        required
                                        maxLength={2000}
                                        rows={4}
                                        defaultValue={replies[review.id] || ''}
                                        onInput={(event) =>
                                            event.currentTarget.setCustomValidity(
                                                '',
                                            )
                                        }
                                    />
                                </label>
                                <p className="preview-note">
                                    Use sample text. Replies stay on this page
                                    only.
                                </p>
                                <button
                                    type="submit"
                                    className="button button--cyan"
                                >
                                    Preview reply{' '}
                                    <Icon name="arrow" size={15} />
                                </button>
                            </form>
                            <p className="sr-only" role="status">
                                {replies[review.id]
                                    ? `Preview reply for ${review.name} updated locally. Not posted.`
                                    : ''}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </DashboardLayout>
    );
}
