import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import { useAuth } from '../contexts/AuthContext';

function Logon() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isLoggingOn, setIsLoggingOn] = useState(false);


    async function handleSubmit(event){
        event.preventDefault();
        setIsLoggingOn(true);
        setAuthError('');

        const result = await login(email, password);

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
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextInputWithLabel
                    elementId="password"
                    labelText="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" disabled={isLoggingOn}>
                    {isLoggingOn ? 'Logging in...' : 'Login'}
                </button>
                
            </form>
        </div>
    )
}

export default Logon;