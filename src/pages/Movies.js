import { Link } from "react-router-dom";
import { API } from "../consts";
import axios from "axios";
import React, { useState } from "react";
import FoundMovies from "../components/FoundMovies";
import SearchInput from "../components/SearchInput";
import PaginationForMovies from "../components/PaginationForMovies";
import { useRouteMatch } from "react-router";

export default function Movies() {
    const [arrMovies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState("");
    const [pagePagination, setPagePagination] = React.useState(1);
    let { path, url } = useRouteMatch();

    console.log(path, "path");
    console.log(url, "url");

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
            setError(response.data);
        }
    };

    const handleChange = (pagePagination = 1) => {
        console.log(pagePagination, "pagePagination Page");
        setPagePagination(pagePagination);
        fetchData(searchValue, pagePagination);
    };

    return (
        <div>
            <h1>MOVIES</h1>

            <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <Link to={`${url}?s=${searchValue}&page=${pagePagination}`}>
                <button
                    type="button"
                    disabled={!searchValue}
                    onClick={() => handleChange(pagePagination)}>
                    Найти
                </button>
            </Link>

            {arrMovies.Response === "True" && arrMovies?.Search && (
                <>
                    <FoundMovies arrMovies={arrMovies} />
                    <PaginationForMovies
                        arrMovies={arrMovies}
                        pagePagination={pagePagination}
                        handleChange={handleChange}
                    />
                </>
            )}

            {error.Response === "False" && <div>Ничего не нашлось</div>}
        </div>
    );
}
