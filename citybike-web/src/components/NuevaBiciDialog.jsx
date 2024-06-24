import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const CrearBici = async (idEstacion, modelo) => {
    const token = localStorage.getItem("token")
    const uri = Gateway + `/estaciones/${idEstacion}/bicis`
    const formBody = `modelo=${modelo}`
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + token)
    myHeaders.append('Content-Type', 'x-www-form-urlencoded;charset=UTF-8')
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body : modelo,
      redirect: "follow",
    
    }
    try {
      const response = await fetch(uri, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (err) {
      if (err.name === "AbortError") {
        alert(
          "Fetch aborted by user action (browser stop button, closing tab, etc."
        )
      } else if (err.name === "TypeError") {
        alert("AbortSignal.timeout() method is not supported")
      } else {
        // A network error, or some other problem.
        alert(`Error: type: ${err.name}, message: ${err.message}`)
      }
    }
    return {}
  }

function NuevaBiciDialog(idEstacion) {
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
  const handleSubmit = () => {
    CrearBici(idEstacion.idEstacion, form.modelo)
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
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
            <Button variant="primary" type="submit">
                Añadir
            </Button>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default NuevaBiciDialog;