import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Movie(){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        .then((response) => {
            const { data: moviesAPI } = response;
            setMovies([...moviesAPI]);
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);

    return (
        <>
            <h2>Selecione o filme</h2>
            <section className="movies">
                    {
                        movies.map(({id, title, posterURL}) => {
                            return (
                                <Link to={`/filme/${id}`} key={id} >
                                    <article className="movie">
                                        <img src={posterURL} alt={title} />  
                                    </article>
                                </Link>
                            );
                        })
                    }
            </section>
        </>
    );
}