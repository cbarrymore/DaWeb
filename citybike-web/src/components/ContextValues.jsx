import { Stack } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export const DebugComponent = () => {
    const {user,token,role,id} = useAuth();

    return (
        <Stack direction='horizontal' gap={5}>
            {/* <h2>User Context Value:</h2> */}
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {/* <h2>Token Context Value:</h2>
            <pre>{token !== null? 'Está':'No está' }</pre> */}
            {/* <h2>Role Context Value:</h2> */}
            <pre>{JSON.stringify(role, null, 2)}</pre>
            {/* <h2>Id Context Value:</h2>
            <pre>{JSON.stringify(id, null, 2)}</pre> */}

        </Stack>
    );
};

