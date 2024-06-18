import { useState, useEffect } from 'react';

const FormularioEstacion = ({ onSubmit, initialData }) => {
    const [form, setForm] = useState({
        nombre: '',
        numPuestos: '',
        dirPostal: '',
        latitud: '',
        longitud: ''
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            nombre: '',
            numPuestos: '',
            dirPostal: '',
            latitud: '',
            longitud: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
            />
            <input
                type="number"
                name="dirPostal"
                placeholder="Código Postal"
                value={form.dirPostal}
                onChange={handleChange}
            />
            <input
                type="number"
                step="0.0001"
                name="latitud"
                placeholder="Latitud"
                value={form.latitud}
                onChange={handleChange}
            />
            <input
                type="number"
                step="0.0001"
                name="longitud"
                placeholder="Longitud"
                value={form.longitud}
                onChange={handleChange}
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default FormularioEstacion;
