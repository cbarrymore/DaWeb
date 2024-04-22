import { useAuth } from "../hooks/useAuth"

export const Estaciones = () => {
    const {user} = useAuth()

    if (user === "gestor") {
        // Show CRUD operations
        return (
            <div>
                CRUD
                {/* CRUD operations */}
            </div>
        )
    } else if (user === "usuario") {
        // Show only read
        return (
            <div>
                LECTURA
                {/* Read operations */}
            </div>
        )
    }

    return null;

}