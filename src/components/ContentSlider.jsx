import React from 'react';
import { Card } from 'react-bootstrap';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../stylesheets/ContentSlider.css';
import { Link } from 'react-router-dom';

function ContentSlider(){
    const settings = {
        dots: true,
        infinite: false,
        slidesToScroll: 1,
        draggable: false,
        slidesToShow: 3,
        centerMode: false,
        speed:500,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
      };
    
    return(
        <Slider {...settings}>

            <Card className='slider-card'>
            <Card.Img variant="top" src={`/resources/image1.png`} />
            <Card.Body>
                <Card.Title>Le nostre proposte per il giorno del ricordo</Card.Title>
            </Card.Body>
            </Card>
            <Card className='slider-card'>
            <Card.Img variant="top" src={`/resources/image2.png`} />
            <Card.Body>
                <Card.Title>Disegni di mafie</Card.Title>
            </Card.Body>
            </Card>
            
            <Card className='slider-card'>
            <Link to="/le-nostre-proposte-per-il-giorno-della-memoria" className="card-link">
            <Card.Img variant="top" src={`/resources/image3.png`} />
            <Card.Body>
                <Card.Title>Le nostre proposte per il giorno della memoria</Card.Title>
            </Card.Body>
            </Link>
            </Card>
            
            <Card className='slider-card'>
            <Card.Img variant="top" src={`/resources/image4.png`} />
            <Card.Body>
                <Card.Title>Bando servizio civile 2024</Card.Title>
            </Card.Body>
            </Card>
        </Slider>
    );
}

export default ContentSlider;