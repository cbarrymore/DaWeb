
class Estacion {
    constructor(nombre, direccion, capacidad) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.capacidad = capacidad;
        this.bicicletas = [];
    }

    agregarBicicleta(bicicleta) {
        if (this.bicicletas.length < this.capacidad) {
            this.bicicletas.push(bicicleta);
            return true;
        } else {
            return false;
        }
    }

    quitarBicicleta(bicicleta) {
        const index = this.bicicletas.indexOf(bicicleta);
        if (index !== -1) {
            this.bicicletas.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

export default Estacion;