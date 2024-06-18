import React from 'react';

const Pagination = ({ stationsPerPage,totalPages ,handlePagination,currentPage}) => {
  const paginationNumbers = [];
 
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i);
  }

  return (
        <div className='pagination'>
            {
                paginationNumbers.map((data) => (
                    <button key={data} onClick={() => handlePagination(data)} className={currentPage === data ? 'active' : ''}>
                        {data}
                    </button>
                ))
            }
        </div>
    )
};

export default Pagination;