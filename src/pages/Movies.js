import { API } from "../consts";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FoundMovies from "../components/FoundMovies";
import SearchInput from "../components/SearchInput";
import PaginationForMovies from "../components/PaginationForMovies";

export default function Movies() {
    const [arrMovies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [pagePagination, setPagePagination] = React.useState(1);

    const fetchData = async (searchValue, pagePagination) => {
        const response = await axios.get(
            `${API}${searchValue}&page=${pagePagination}`
        );
        console.log(response.data, "response");
        console.log(response.data.Search, "search");
        if (response.data.Search) {
            setMovies(response.data);
        } else {
            setMovies([]);
        }
    };

    const handleChange = (event, value) => {
        setPagePagination(value);
        console.log(value, "value Page");
    };

    useEffect(() => {
        fetchData(searchValue, pagePagination);
    }, [searchValue, pagePagination]);

    return (
        <div>
            <h1>MOVIES</h1>
            <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {arrMovies.Response === "True" ? (
                arrMovies?.Search && <FoundMovies arrMovies={arrMovies} />
            ) : (
                <div>Нет данных</div>
            )}

            <PaginationForMovies
                arrMovies={arrMovies}
                pagePagination={pagePagination}
                handleChange={handleChange}
            />
        </div>
    );
}
