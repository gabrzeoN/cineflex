import "./style.css";

export default function Footer({posterURL, title}){
    return (
        <footer className="Footer" >            
            <div>
                <img src={posterURL} alt={title} />
            </div>
            <p>{title}</p>
        </footer>
    );
}