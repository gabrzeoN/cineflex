import "./style.css";

export default function Footer({posterURL, title, weekday, time}){

        return (
            <footer className="Footer" >            
                <div className="poster">
                    <img src={posterURL} alt={title} />
                </div>
                <div>
                    <p>{title}</p>
                    {
                        weekday ? <p>{weekday} - {time}</p> : <p></p>
                    }       
                </div>
            </footer>
        );
}