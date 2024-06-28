import { Button } from "react-bootstrap";
import {buttonStyle} from "../utils/ComponentsStyles";

const Pagination = ({ elementsPerPage,totalPages ,handlePagination,currentPage}) => {
  const paginationNumbers = [];
 
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
        <div className="mx-auto">
            {
                paginationNumbers.map((number) => (
                    <Button  key={number} onClick={() => handlePagination(number)} className={currentPage === number ? 'active m-1 mb-3' : 'm-1 mb-3' } style={buttonStyle}>
                        {number}
                    </Button>
                ))
            }
        </div>
    )
};

export default Pagination;