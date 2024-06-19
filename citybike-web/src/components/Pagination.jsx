const Pagination = ({ elementsPerPage,totalPages ,handlePagination,currentPage}) => {
  const paginationNumbers = [];
 
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
        <div className='pagination'>
            {
                paginationNumbers.map((number) => (
                    <button key={number} onClick={() => handlePagination(number)} className={currentPage === number ? 'active' : ''}>
                        {number}
                    </button>
                ))
            }
        </div>
    )
};

export default Pagination;