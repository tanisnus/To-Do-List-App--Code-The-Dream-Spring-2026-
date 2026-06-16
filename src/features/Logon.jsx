import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useAuth } from '../contexts/AuthContext';
import {
  getEmailError,
  getPasswordError,
  MAX_EMAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../utils/todoValidation';
import { sanitizeInput } from '../utils/sanitize';

function Logon() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setAuthError('');

        const emailError = getEmailError(email);
        if (emailError) {
            setAuthError(emailError);
            return;
        }

        const passwordError = getPasswordError(password);
        if (passwordError) {
            setAuthError(passwordError);
            return;
        }

        const cleanEmail = sanitizeInput(email);
        if (!cleanEmail) {
            setAuthError('Email contains invalid characters.');
            return;
        }

        setIsLoggingOn(true);

        const result = await login(cleanEmail, password);

        if (!result.success) {
            setAuthError(result.error);
        }

        setIsLoggingOn(false);
    }

    return (
        <div>
            <h1>Login</h1>
            {authError && <p>{authError}</p>}
            <form onSubmit={handleSubmit}>
                <TextInputWithLabel
                    elementId="email"
                    labelText="Email"
                    value={email}
                    maxLength={MAX_EMAIL_LENGTH}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextInputWithLabel
                    elementId="password"
                    labelText="Password"
                    type="password"
                    value={password}
                    maxLength={MAX_PASSWORD_LENGTH}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" disabled={isLoggingOn}>
                    {isLoggingOn ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Logon;
