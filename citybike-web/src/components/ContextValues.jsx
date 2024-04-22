import { useAuth } from '../hooks/useAuth';

export const DebugComponent = () => {
    const {user} = useAuth();

    return (
        <div>
            <h2>User Context Value:</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    );
};

