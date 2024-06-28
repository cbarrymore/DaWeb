import { Button, Container } from "react-bootstrap";
import {buttonStyle} from "../utils/ComponentsStyles";

const Pagination = ({ elementsPerPage,totalPages ,handlePagination,currentPage}) => {
  const paginationNumbers = [];
 
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
        <Container className="d-flex justify-content-center align-items-center">
            {
                paginationNumbers.map((number) => (
                    <Button  key={number} onClick={() => handlePagination(number)} className={currentPage === number ? 'active boton' : 'boton' } >
                        {number}
                    </Button>
                ))
            }
        </Container>
    )
};

export default Pagination;