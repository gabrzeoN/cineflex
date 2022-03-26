import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import "./style.css";

export default function Movies(){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        .then(response => {
            const { data: moviesAPI } = response;
            setMovies([...moviesAPI]);
        })
        .catch(error => console.log("Error " + error.response.status));
    }, []);

    return (
        <main className="Movies" >
            <h2>Selecione o filme</h2>
            <section className="movies">
                    {
                        movies.map(({id, title, posterURL}) => {
                            return (
                                <Link key={id} to={`/sessoes/${id}`} >
                                    <article className="movie">
                                        <img src={posterURL} alt={title} />  
                                    </article>
                                </Link>
                            );
                        })
                    }
            </section>
        </main>
    );
}