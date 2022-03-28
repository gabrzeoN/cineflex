import { Link, useLocation } from "react-router-dom";

export default function Success(){
    const location = useLocation();
    const {movie, seats, clientInformation} = location.state;
    const {title, day, time} = movie;
    const {name, cpf} = clientInformation;

    return (
        <main>
            <h2>Pedido feito com sucesso!</h2>

            <section>
                <h3>Filme e sessão</h3>
                <p>{title}</p>
                <p>{day} {time}</p>
            </section>

            <section>
                <h3>Ingressos</h3>
                <ul>
                    <li>{seats}</li>
                    
                </ul>
            </section>

            <section>
                <h3>Comprador</h3>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </section>

            <Link to="/" >
                <button>Voltar para home</button>
            </Link>
        </main> 
    );
}