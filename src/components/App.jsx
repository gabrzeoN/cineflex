import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./../assets/css/reset.css";
import "./../assets/css/style.css";

import Header from "./Header.jsx";
import Movie from "./Movie.jsx";
import Time from "./Time.jsx";
import Seats from "./Seats.jsx";
import Success from "./Success.jsx";

export default function App(){
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Movie />} ></Route>
                <Route path="/filme/23" element={<Time />} ></Route>
                <Route path="/sessao/24" element={<Seats />} ></Route>
                <Route path="/sucesso" element={<Success />} ></Route>
            </Routes>
        </BrowserRouter>
    );
}