import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Seat from "../Seat";
import Footer from "../Footer";
import "./style.css";

export default function Seats() {
    const navigate = useNavigate();
    const { idSessao } = useParams();
    const [seatsSelected, setSeatsSelected] = useState([]);
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
        console.log({...clientInformation, ids: [...seatsSelected]})
        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {...clientInformation, ids: [...seatsSelected]})
        .then(response => {
            const bookingInformation = {
                movie: {
                    title: "v",
                    day: "s",
                    time: "s"
                },
                seats: [],
                clientInformation: {
                    name: "a",
                    cpf: "a"
                }
            };

            return (
                navigate('/sucesso', {state: bookingInformation})
            );
        })
        .catch((error) => console.log("Error " + error.response.status));
        console.log(clientInformation);
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
                                    <Seat isAvailable={seat.isAvailable} id={seat.id} name={seat.name} setSeatsSelected={setSeatsSelected} seatsSelected={seatsSelected} />
                                </div>
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
                    <form action="" onSubmit={closeOrder}>
                        <label htmlFor="">Nome do comprador: </label>
                        <input 
                            required
                            type="text" 
                            onChange={(event) => 
                                setClientInformation({...clientInformation, name: event.target.value})
                            }
                        />
                        
                        <label htmlFor="">CPF do comprador: </label>
                        <input 
                            type="text" 
                            required 
                            onChange={(event) => 
                                setClientInformation({...clientInformation, cpf: event.target.value})
                            }    
                        />
                        {/* <Link to={`/sucesso`}> */}
                            <button type="submit">Reservar assento(s)</button>
                        {/* </Link> */}
                    </form>
                </section>
            </main>
            
            <Footer posterURL={session.movie.posterURL} title={session.movie.title} />
        </>
    );
}












//         <button
//             key={seat.id}
//             className={
//                 `seat
//                 ${seat.isAvailable ? "available" : "unavailable"}
//                 ${seatStatus}
//             `}
//             onClick={() => validateSeat(seat.name, seat.isAvailable)}
//         >
//                 <h3>{seat.name}</h3>
//         </button>




// function validateSeat(seatNumber, available){
//     if(available && seatStatus !== "selected"){
//         setSeatStatus("selected");
//     }else{
        
//     }


//     // if(session.seats[seatNumber - 1].isAvailable){
//     //     console.log("disponivel");
//     //     // setSeatSelected(true);
//     //     return true
//     // }else{
//     //     console.log("nao disponivel");
//     // }
// }