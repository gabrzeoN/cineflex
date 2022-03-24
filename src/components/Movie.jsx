import axios from 'axios';
import { useState, useEffect } from 'react';

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
        <main>
            <h2>Selecione o filme</h2>
            <section className="movies">
                    {
                        movies.map(({id, posterURL}) => {
                            return (
                                <article key={id} className="movie">
                                    <img src={posterURL} alt="" />  
                                </article>
                            );
                        })
                    }
            </section>
        </main>
    );
}