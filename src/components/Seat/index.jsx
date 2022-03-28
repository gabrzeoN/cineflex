import { useState } from "react";
import "./style.css";

export default function Seat({isAvailable, name, id, setSeatsSelected, seatsSelected}){
    const [seatSelected, setSeatSelected] = useState("");

    function validateSeat(seatIsAvailable){
        if(seatIsAvailable && !seatSelected){
            setSeatSelected("selected");
            setSeatsSelected([...seatsSelected, id])
            // seatsSelected.push(id);
            // console.log(seatsSelected);

        }else if (seatIsAvailable && seatSelected){
            setSeatSelected("");

            const seatsSelectedCopy = [...seatsSelected];
            seatsSelectedCopy.splice(seatsSelectedCopy.indexOf(id) , 1)
            setSeatsSelected([...seatsSelectedCopy])
            // console.log(seatsSelected);
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
            <h3>{name}</h3>
        </button>
    );
}









