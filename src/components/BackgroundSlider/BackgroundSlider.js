import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./SliderCSS.css";

export default function BackgroundSlider() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={5}
      isPlaying={true}
      interval={4500}
      infinite={true}
    >
      <Slider style={{ height: "35vh" }}>
        <Slide index={0}>
          <img
            className="slider-image"
            src="https://images.unsplash.com/photo-1500856056008-859079534e9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
            alt="motivation"
          />
        </Slide>
        <Slide index={1}>
          <img
            className="slider-image"
            src="https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            alt="motivation2"
          />
        </Slide>
        <Slide index={2}>
          <img
            className="slider-image"
            src="https://images.unsplash.com/photo-1525706732602-52592370085e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            alt="motivation3"
          />
        </Slide>
        <Slide index={3}>
          <img
            className="slider-image"
            src="https://images.unsplash.com/photo-1505027492977-1037f14c46fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1746&q=80"
            alt="motivation4"
          />
        </Slide>
        <Slide index={5}>
          <img
            className="slider-image"
            src="https://images.unsplash.com/photo-1491609154219-ffd3ffafd992?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            alt="motivation5"
          />
        </Slide>
      </Slider>
    </CarouselProvider>
  );
}
