import React from "react";
import Pagination from "@material-ui/lab/Pagination";


function PaginationForMovies({ arrMovies, pagePagination, handleChange }) {
    return (
        <div>
            <Pagination
                count={Math.ceil(arrMovies.totalResults / 10)}
                page={pagePagination}
                onChange={handleChange}
                color="primary"
            />
        </div>
    );
}

export default PaginationForMovies;
