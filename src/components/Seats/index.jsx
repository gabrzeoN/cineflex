import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Seat from "../Seat";
import Footer from "../Footer";
import "./style.css";

export default function Seats() {
    const navigate = useNavigate();
    const { idSessao } = useParams();
    const [seatsSelected, setSeatsSelected] = useState([]);
    const [seatsSelectedName, setSeatsSelectedName] = useState([]);
    const [clientInformation, setClientInformation] = useState({ids: [], name: "", cpf: ""});
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
            setSession({...sessionsAPI});
        })
        .catch((error) => console.log("Error " + error.response.status));
    }, []);
        
    function closeOrder(event){
        event.preventDefault();
        if(seatsSelectedName.length <= 0){
            alert("Selecione ao menos um assento!");
        }else{
            axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {...clientInformation, ids: [...seatsSelected]})
            .then(response => {
                const seats = [clientInformation.ids]
                console.log(seatsSelectedName);
                const bookingInformation = {
                    movie: {
                        title: session.movie.title,
                        weekday: session.day.weekday,
                        data: session.day.date
                    },
                    seats: [...seatsSelectedName],
                    clientInformation: {
                        name: clientInformation.name,
                        cpf: clientInformation.cpf,
                    }
                };

                return (
                    navigate('/sucesso', {state: bookingInformation})
                );
            })
            .catch((error) => console.log("Error " + error.response.status));
        }
    }

    return (
        <>
            <main className="Seats" >
                <h2>Selecione o(s) assento(s)</h2>
                <section className="seats">
                    {
                        session.seats.map(seat => {
                            return (
                                <div key={seat.id} >
                                    <Seat 
                                        isAvailable={seat.isAvailable} 
                                        id={seat.id} name={seat.name} 
                                        setSeatsSelected={setSeatsSelected} 
                                        seatsSelected={seatsSelected} 
                                        setSeatsSelectedName={setSeatsSelectedName} 
                                        seatsSelectedName={seatsSelectedName} 
                                    />
                                </div>
                            );
                        })
                    }
                </section>
                <section className="caption">
                    <div className="seat selected" ><p>Selecionado</p></div>
                    <div className="seat available" ><p>Disponível</p></div>
                    <div className="seat unavailable" ><p>Indisponível</p></div>
                </section>
                <section className="client-infos">
                    <form action="" onSubmit={closeOrder}>
                        <label htmlFor="">Nome do comprador: </label>
                        <input 
                            required
                            placeholder="Digite seu nome..."
                            type="text" 
                            onChange={(event) => 
                                setClientInformation({...clientInformation, name: event.target.value})
                            }
                        /> 
                        <label htmlFor="">CPF do comprador: </label>
                        <input 
                            required 
                            placeholder="Digite seu CPF..."
                            type="text" 
                            pattern="[0-9]+"
                            title="Deve conter somente números"
                            minLength="11" // 12345678911
                            maxLength="11"
                            onChange={(event) => 
                                setClientInformation({...clientInformation, cpf: event.target.value})
                            }    
                        />
                        <div>
                            <button type="submit">Reservar assento(s)</button>
                        </div>
                    </form>
                </section>
            </main>
            
            <Footer 
                posterURL={session.movie.posterURL} 
                title={session.movie.title} 
                weekday={session.day.weekday} 
                time={session.name}
            />
        </>
    );
}