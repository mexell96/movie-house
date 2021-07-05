import { APIFull } from "./../consts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Movie() {
    let { id } = useParams();
    const [movie, setMovie] = useState();

    const fetchData = async (id) => {
        const response = await axios.get(`${APIFull}${id}`);
        console.log(response.data, "responseNEW");
        if (response.data) {
            setMovie(response.data);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, []);

    return (
        <div>
            {movie ? (
                <div>
                    <h4>{movie.Title}</h4>
                    <img src={movie.Poster} alt={movie.Title} />
                    <span>{movie.Year}</span>
                    <span>{movie.Plot}</span>
                </div>
            ) : (
                <h3>Загрузка</h3>
            )}
        </div>
    );
}

export default Movie;
