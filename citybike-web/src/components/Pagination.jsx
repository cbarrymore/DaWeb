import { useState } from "react"
import { Button, Container, Pagination as PaginationBT } from "react-bootstrap"

const controlPaginationNumbersRender = (
  totalPages,
  currentPage,
  paginationNumbers,
  maxPaginationButtons
) => {

    let zeroToNCurrentPage = currentPage+1
//   if (totalPages < 3) {
//     return paginationNumbers 
//     }
//   if (currentPage < 3) {
//     return paginationNumbers.slice(0, 3)
//   } else if (currentPage > totalPages - 2) {
//     return paginationNumbers.slice(totalPages - 3, totalPages)
//   } else {
//     return paginationNumbers.slice(currentPage - 2, currentPage + 1)
//   }

    if (totalPages <= maxPaginationButtons) {
        return paginationNumbers 
    }
    if (zeroToNCurrentPage < maxPaginationButtons) {
        return paginationNumbers.slice(0, maxPaginationButtons)
    } else if (zeroToNCurrentPage > totalPages - (maxPaginationButtons - 1)) {
        return paginationNumbers.slice(totalPages - maxPaginationButtons, totalPages)
    } else {
        return paginationNumbers.slice(zeroToNCurrentPage - (maxPaginationButtons - 1 ), zeroToNCurrentPage + 1)
    }
    
}

const Pagination = ({
  elementsPerPage,
  totalPages,
  handlePagination,
  currentPage,
}) => {
  let paginationNumbers = []

  const [maxPaginationButtons] = useState(3)

  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i)
  }
  
  paginationNumbers = controlPaginationNumbersRender(
    totalPages,
    currentPage,
    paginationNumbers,
    maxPaginationButtons
  )

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <PaginationBT>
        <PaginationBT.First
          onClick={() => handlePagination(0)}
          disabled={currentPage === 0}
        />
        <PaginationBT.Prev
          onClick={() => {
            console.log(currentPage , totalPages)
              handlePagination(currentPage - 1)}
          }
          disabled={currentPage === 0}
        />
        {paginationNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => handlePagination(number - 1)}
            className={currentPage + 1 === number ? "boton-activo" : "boton"}
          >
            {number}
          </Button>
        ))}
        

        <PaginationBT.Next
          onClick={() => {
             console.log(currentPage , totalPages)
              handlePagination(currentPage + 1)}
          } 
          disabled={currentPage + 1  === totalPages}
        />
        <PaginationBT.Last
          onClick={() => {
            console.log(currentPage , totalPages)
            handlePagination(totalPages - 1)}
        }
          disabled={currentPage + 1 === totalPages}
        />
      </PaginationBT>
    </Container>
  )
}

export default Pagination
