import React from 'react';
import {  useNavigate } from "react-router-dom"
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Gateway from '../configs/constants';
import { darBajaBici } from '../apis/AccessEstaciones';
import { dialogHeadStyle } from '../utils/ComponentsStyles';


const BorrarBici = (idEstacion, idBici, motivoBaja) => {
  darBajaBici(idEstacion, idBici, motivoBaja).then((response) => {
      Swal.fire({
          title: 'Bici dada de baja!',
          text: 'La bici se ha dado de baja correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
      });
  })
  .catch((error) => {
      Swal.fire({
          title: 'Error!',
          text: `No se pudo dar de baja la bici. ${error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
      });
  })
}


const FormDialog = ({idEstacion, idBici}) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    modelo: ''
});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    })};


    const handleSubmit = (e) => {
      e.preventDefault();
      BorrarBici(idEstacion, idBici, form.motivoBaja)
      setForm({
        motivoBaja: '',
      });
      setShow(false);
      navigate(`/estaciones/${idEstacion}`)
      
    }
  /*
open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            onSubmit(formJson);
            handleClose();
          },
        }}*/

          return (
            <>
              <Button variant="primary" className="boton" onClick={handleShow}>
                -
              </Button>
        
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header style={dialogHeadStyle} closeButton >
                  <Modal.Title>Dar bici de baja</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Motivo de la baja</Form.Label>
                      <Form.Control
                        name='motivoBaja'
                        type="text"
                        value={form.motivoBaja} 
                        onChange={handleChange}
                        placeholder="Motivo de la baja"
                        autoFocus
                        required
                      />
                    </Form.Group>
                    <Button className='mx-1 boton' variant="primary" type="submit">
                        Eliminar
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

export default FormDialog;