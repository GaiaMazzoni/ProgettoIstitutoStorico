import '../stylesheets/LogoAndTitle.css';

export default function LogoAndTitle(){

    return(
        <>
        <div className="logo-and-title">
            <a href='/'>
                <img className="logo" src="resources/logo.png" alt="Logo"/>
            </a>
            <a href='/'>
                <h1> Istituto Storico della Resistenza e dell'Età Contemporanea di Forlì-Cesena </h1>
            </a>
        </div>
        <div className='title-mobile'>
                <a href="/">
                    <h1> Istituto Storico Forlì-Cesena</h1>
                </a>
        </div>
        </>
    )
}