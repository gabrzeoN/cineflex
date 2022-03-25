import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";
import Movie from "./Movie.jsx";
import Session from "./Session.jsx";
import Seats from "./Seats.jsx";
import Success from "./Success.jsx";

export default function App(){
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Movie />} ></Route>
                    <Route path="/filme/:idFilme" element={<Session />} ></Route>
                    <Route path="/sessao/:idFilme" element={<Seats />} ></Route>
                    <Route path="/sucesso" element={<Success />} ></Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}