import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';

const FormDialog = ({onSubmit,buttonText,dialogTitle,dialogContentText,submitText,formFields}) => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
      <Button onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Modal>
        <Modal.Header closeButton>
        <Modal.Title>{}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {dialogContentText}
          </p>
          <Form>
          {formFields.map((field) => (
            <Form.Group className="mb-3">
              <Form.Label>{field.label}</Form.Label>
            <Form.Control
                name={field.name}
                type={field.type}
                value={field} 
                margin="dense"
                onChange={handleChange}
                autoFocus
                required
              />
            </Form.Group>
          ))}
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{submitText}</Button>
          </Form>
        </Modal.Body>
        
      </Modal>
      </>
  );
}

export default FormDialog;