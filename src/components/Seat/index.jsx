import { useState } from "react";
import "./style.css";

export default function Seat({isAvailable, name, id, setSeatsSelected, seatsSelected, setSeatsSelectedName, seatsSelectedName}){
    const [seatSelected, setSeatSelected] = useState("");

    function validateSeat(seatIsAvailable){
    
        if(seatIsAvailable && !seatSelected){
            setSeatSelected("selected");
            setSeatsSelected([...seatsSelected, id])

            setSeatsSelectedName([...seatsSelectedName, name]);
        }else if (seatIsAvailable && seatSelected){
            setSeatSelected("");
            const seatsSelectedCopy = [...seatsSelected];
            seatsSelectedCopy.splice(seatsSelectedCopy.indexOf(id) , 1)
            setSeatsSelected([...seatsSelectedCopy])

            const seatsSelectedNameCopy = [...seatsSelectedName];
            seatsSelectedNameCopy.splice(seatsSelectedNameCopy.indexOf(name) , 1)
            console.log(seatsSelectedNameCopy);
            setSeatsSelectedName([...seatsSelectedNameCopy])
        }else { 
            alert("Esse assento não está disponível!");
        }
    }

    return (
        <button
            className={
                `seat 
                ${isAvailable ? "available" : "unavailable"} 
                ${seatSelected}`
            } 
            onClick={() => validateSeat(isAvailable)}
        >
            {
                parseInt(name) < 10 ? <h3>0{name}</h3> : <h3>{name}</h3>
            }
            
        </button>
    );
}









