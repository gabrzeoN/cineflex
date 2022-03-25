import "./style.css";

export default function Footer({posterURL, title}){
    return (
        <footer className="Footer" >
                {/* {console.log(movie.days)}
                <p>{movie.days[0].id}</p> */}
                <img src={posterURL} alt={title} />
                <p>{title}</p>
        </footer>
    );
}