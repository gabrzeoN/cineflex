import axios from "axios";
import { useState, useEffect } from "react";
import {  Link, useParams } from "react-router-dom";

import Footer from "./../Footer";

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
    const {id, title, posterURL} = movie;
    // const {}

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`)
        .then(response => {
            const { data: movieAPI } = response;
            console.log(movieAPI)
            setMovie({...movieAPI});
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);

    
    // movie.days[0].showtimes.push({name: "199", id: 24})
    return (
        <>
            <main>
                <h1>Selecione o horário</h1>

                {
                    movie.days.map(day => {
                        return (
                            <div key={day.id} className="sessions" >
                                <p>{day.weekday} - {day.date}</p>
                                {
                                    day.showtimes.map(time => {
                                        return (
                                            <Link key={time.id} to="" >
                                                    <button>{time.name}</button>
                                            </Link>
                                        )
                                    })
                                }
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