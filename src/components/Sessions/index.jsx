import axios from "axios";
import { useState, useEffect } from "react";
import {  Link, useParams } from "react-router-dom";

import Footer from "./../Footer";
import "./style.css";

export default function Sessions(){
    const { idFilme } = useParams();
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        posterURL: "",
        overview: "",
        releaseDate: "",
        days: [
            {
                id: 0,
                weekday: "",
                date: "",
                showtimes: [
                    {
                        name: "",
                        id: 0
                    }
                ]
            },
        ]
    });

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        .then(response => {
            const { data: movieAPI } = response;
            setMovie({...movieAPI});
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);

    return (
        <>
            <main className="Sessions">
                <h2>Selecione o horário</h2>
                {
                    movie.days.map(day => {
                        return (
                            <div key={day.id} className="day" >
                                <p>{day.weekday} - {day.date}</p>
                                <div className="sessions">
                                    {
                                        day.showtimes.map(time => {
                                            return (
                                                <Link key={time.id} to={`/assentos/${time.id}`} >
                                                        <button>{time.name}</button>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        );
                        
                    })
                }
                <p></p>
            </main>
            
            <Footer posterURL={movie.posterURL} title={movie.title} />
        </> 
    );
}