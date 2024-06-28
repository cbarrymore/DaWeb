import { Modal, Spinner } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
  return (
    <Modal
      show={show}
      centered
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      size='sm'
    >
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
