import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Footer from "../Footer";
import "./style.css";

export default function Seats() {
    const { idSessao } = useParams();
    console.log(idSessao);

    const [session, setSession] = useState({
        id: 0,
        name: "",
        day: {
            id: 0,
            weekday: "",
            date: ""
        },
        movie: {
            id: 1,
            title: "",
            posterURL: "",
            overview: "",
            releaseDate: ""
        },
        seats: [
            {
                id: 0,
                name: "",
                isAvailable: false
            }
        ]
    });

    
    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`)
        .then((response) => {
            const { data: sessionsAPI } = response;
            console.log(sessionsAPI);
            setSession({...sessionsAPI});
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);
        
    function validateSeat(seatNumber){
        if(session.seats[seatNumber - 1].isAvailable){
            console.log("disponivel");
        }else{
            console.log("nao disponivel");
        }
    }

    return (
        <>
            <main className="Seats" >
                <h2>Selecione o(s) assento(s)</h2>
                <section className="seats">
                    {
                        session.seats.map(seat => {
                            console.log(seat.isAvailable)
                            return (
                                    <button
                                        key={seat.id}
                                        className={`seat ${seat.isAvailable ? "available" : "unavailable"}`}
                                        onClick={() => validateSeat(seat.name)}
                                    >
                                            <h3>{seat.name}</h3>
                                    </button>
                            );
                        })
                    }
                </section>
                <section className="caption">
                    <div className="seat" ></div>
                    <div className="seat" ></div>
                    <div className="seat" ></div>
                </section>
                <section className="client-infos">
                    <form action="">
                        <label htmlFor="">Nome do comprador: </label>
                        <input type="text" />
                        <label htmlFor="">CPF do comprador: </label>
                        <input type="text" />
                        <button>Reservar assento(s)</button>
                    </form>
                </section>
            </main>
            
            <Footer posterURL={session.movie.posterURL} title={session.movie.title} />
        </>
    );
}