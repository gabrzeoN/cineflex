import { useState } from "react";
import "./style.css";

export default function Seat({isAvailable, name, id}){
    const [seatSelected, setSeatSelected] = useState("");

    function validateSeat(seatIsAvailable){
        if(seatIsAvailable && !seatSelected){
            setSeatSelected("selected");
        }else if (seatIsAvailable && seatSelected){
            setSeatSelected("");
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









