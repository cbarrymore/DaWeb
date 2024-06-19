import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

const FormDialog = ({onSubmit,buttonText,dialogTitle,dialogContentText,submitText,formFields}) => {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        {buttonText}
      </button>
      <Dialog
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
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogContentText}
          </DialogContentText>
          {formFields.map((field) => (
            <TextField
              key={field.id} // Add a unique key prop
              autoFocus
              required
              margin="dense"
              id={field.id}
              name={field.name}
              label={field.label}
              type={field.type}
              fullWidth
              variant="standard"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{submitText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default FormDialog;