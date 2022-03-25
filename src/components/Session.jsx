import axios from "axios";
import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";

export default function Session(){
    // console.log("useParams" + useParams())
    const { idFilme } = useParams();
    // console.log(idFilme)

    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        .then(response => {
            const { data: movieAPI } = response;
            console.log(movieAPI)
            setMovie({...movieAPI});
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);

    return (
        <>
            <h1>{movie.title}</h1>
        </> 
    );
}