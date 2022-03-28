import { Link, useLocation } from "react-router-dom";

import "./style.css";

export default function Success(){
    const location = useLocation();
    const {movie, seats, clientInformation} = location.state;
    const {title, weekday, data} = movie;
    const {name, cpf} = clientInformation;
    cpf.toString()


    return (
        <main className="Success">
            <h2>Pedido feito com sucesso!</h2>

            <section>
                <h3>Filme e sessão</h3>
                <p>{title}</p>
                <p>{weekday} {data}</p>
            </section>

            <section>
                <h3>Ingressos</h3>
                <ul>
                    {
                        seats.map((seat) => <li key={seat} >Assento {seat}</li>)
                    }    
                </ul>
            </section>

            <section>
                <h3>Comprador</h3>
                <p>Nome: {name}</p>
                <p>CPF: {`${cpf[0] + cpf[1] + cpf[2]}.${cpf[3] + cpf[4] + cpf[5]}.${cpf[6] + cpf[7] + cpf[8]}-${cpf[9] + cpf[10]}`}</p>
            </section>

            <Link to="/" >
                <div className="button">
                    <button>Voltar para home</button>
                </div>
            </Link>
        </main> 
    );
}