import { useAuth } from '../hooks/useAuth';

export const DebugComponent = () => {
    const {user,token,role} = useAuth();

    return (
        <div>
            <h2>User Context Value:</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <h2>Token Context Value:</h2>
            <pre>{token !== null? 'Está':'No está' }</pre>
            <h2>Role Context Value:</h2>
            <pre>{JSON.stringify(role, null, 2)}</pre>
        </div>
    );
};

