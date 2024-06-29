import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {  useNavigate } from "react-router-dom"

import Gateway from '../configs/constants';
import { darAltaBici } from '../apis/AccessEstaciones';
import Swal from 'sweetalert2';
import { dialogHeadStyle } from '../utils/ComponentsStyles';

const CrearBici = async (idEstacion, modelo) => {
    darAltaBici(idEstacion, modelo).then((response) => {
        Swal.fire({
            title: 'Bici añadida!',
            text: 'La bici se añadió correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    })
    .catch((error) => {
        Swal.fire({
            title: 'Error!',
            text: `No se pudo añadir la bici. ${error}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    })
  }

function NuevaBiciDialog({idEstacion}) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    modelo: ''
});
const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    });
};
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    CrearBici(idEstacion, form.modelo);
    setForm({
      modelo: '',
    });
    setShow(false);
    navigate(`/estaciones/${idEstacion}`)
    
  }
  return (
    <>
      <Button className='boton' variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header style={dialogHeadStyle} closeButton>
          <Modal.Title>Nueva Bici</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                name='modelo'
                type="text"
                value={form.modelo} 
                onChange={handleChange}
                placeholder="Rally, Montaña..."
                autoFocus
                required
              />
            </Form.Group>
            <Button className='mx-1 boton' variant="primary" type="submit">
                Añadir
            </Button>
            <Button className='mx-1 botonCancelar' variant="secondary" onClick={handleClose}>
                Cancelar
            </Button>
          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default NuevaBiciDialog;