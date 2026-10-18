import { Link } from '@inertiajs/react';
import { useId, useState } from 'react';
import Icon from './Icon';

export default function AuthDialog({ dialogRef }) {
    const id = useId();
    const [mode, setMode] = useState('login');
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const register = mode === 'register';

    function changeMode(nextMode) {
        setMode(nextMode);
        setMessage('');
        setVisible(false);
    }

    return (
        <dialog
            ref={dialogRef}
            className="auth-dialog"
            aria-labelledby={`${id}-heading`}
            onClose={() => {
                dialogRef.current.querySelector('form')?.reset();
                changeMode('login');
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget)
                    dialogRef.current.close();
            }}
        >
            <button
                type="button"
                className="auth-close"
                aria-label="Close sign in"
                onClick={() => dialogRef.current.close()}
            >
                <Icon name="close" />
            </button>
            <div
                className="auth-tabs"
                role="tablist"
                aria-label="Account access"
                onKeyDown={(event) => {
                    if (
                        ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(
                            event.key,
                        )
                    ) {
                        event.preventDefault();
                        const next =
                            event.key === 'Home'
                                ? 'login'
                                : event.key === 'End'
                                  ? 'register'
                                  : register
                                    ? 'login'
                                    : 'register';
                        changeMode(next);
                        document.getElementById(`${id}-${next}`)?.focus();
                    }
                }}
            >
                {['login', 'register'].map((tab) => (
                    <button
                        key={tab}
                        id={`${id}-${tab}`}
                        type="button"
                        role="tab"
                        aria-selected={mode === tab}
                        aria-controls={`${id}-panel`}
                        tabIndex={mode === tab ? 0 : -1}
                        onClick={() => changeMode(tab)}
                    >
                        <Icon
                            name={tab === 'login' ? 'login' : 'users'}
                            size={18}
                        />
                        {tab === 'login' ? 'Login' : 'Register'}
                    </button>
                ))}
            </div>
            <div
                className="auth-content"
                id={`${id}-panel`}
                role="tabpanel"
                aria-labelledby={`${id}-${mode}`}
            >
                <h2 id={`${id}-heading`}>
                    {register ? 'Sign Up' : 'Sign In'}{' '}
                    <span>
                        Easy<strong>Book</strong>
                    </span>
                </h2>
                <p className="preview-note">
                    UI preview only. Do not enter real credentials. Nothing is
                    sent or saved.
                </p>
                <form
                    key={mode}
                    className="preview-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.currentTarget.reset();
                        setMessage(
                            register
                                ? 'Registration preview complete. No account was created.'
                                : 'Login preview complete. You are not signed in.',
                        );
                    }}
                >
                    {register && (
                        <label htmlFor={`${id}-name`}>
                            Full name <span>*</span>
                            <input
                                id={`${id}-name`}
                                name="name"
                                required
                                maxLength={100}
                                autoComplete="off"
                            />
                        </label>
                    )}
                    <label htmlFor={`${id}-email`}>
                        {register
                            ? 'Email address'
                            : 'Username or email address'}{' '}
                        <span>*</span>
                        <input
                            id={`${id}-email`}
                            name="email"
                            type={register ? 'email' : 'text'}
                            required
                            maxLength={254}
                            autoComplete="off"
                        />
                    </label>
                    <label htmlFor={`${id}-password`}>
                        Password <span>*</span>
                    </label>
                    <div className="password-field">
                        <input
                            id={`${id}-password`}
                            name="password"
                            type={visible ? 'text' : 'password'}
                            required
                            minLength={8}
                            maxLength={128}
                            autoComplete="new-password"
                            aria-describedby={`${id}-password-help`}
                        />
                        <button
                            type="button"
                            aria-controls={`${id}-password`}
                            aria-label={
                                visible ? 'Hide password' : 'Show password'
                            }
                            aria-pressed={visible}
                            onClick={() => setVisible(!visible)}
                        >
                            {visible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <small id={`${id}-password-help`}>
                        Use a dummy password of at least 8 characters.
                    </small>
                    <button className="button button--cyan" type="submit">
                        {register ? 'Register preview' : 'Log in preview'}{' '}
                        <Icon name="arrow" size={16} />
                    </button>
                    {!register && (
                        <div className="auth-options">
                            <label className="check-label">
                                <input type="checkbox" />
                                Remember me (preview)
                            </label>
                            <button
                                type="button"
                                className="text-button"
                                onClick={() =>
                                    setMessage(
                                        'Password reset is not connected in this preview.',
                                    )
                                }
                            >
                                Lost your password?
                            </button>
                        </div>
                    )}
                    <p className="form-message" role="status">
                        {message}
                    </p>
                </form>
                <div className="auth-separator">
                    <span>or</span>
                </div>
                <p className="auth-social-note">
                    Social sign-in is not connected.
                </p>
                <button
                    type="button"
                    className="auth-facebook"
                    onClick={() =>
                        setMessage(
                            'Facebook sign-in is unavailable in this frontend preview.',
                        )
                    }
                >
                    <strong aria-hidden="true">f</strong>Connect with Facebook
                    (preview)
                </button>
                <Link
                    className="auth-dashboard-link"
                    href="/dashboard/profile"
                    onClick={() => dialogRef.current.close()}
                >
                    Explore the sample dashboard <Icon name="arrow" size={14} />
                </Link>
            </div>
        </dialog>
    );
}
