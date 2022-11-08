"use client";
import React, { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { ApiSlides } from "../../componentApi/SliderApi";
import Image from "next/image";

const Slider = () => {
  // states
  const [slides] = useState(ApiSlides);
  const [activeSlide, setActiveSlide] = useState(0);

  // functions
  const nextSlide = () => {
    if (activeSlide === slides.length - 1) {
      setActiveSlide(0);
    } else {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide === 0) {
      setActiveSlide(slides.length - 1);
    } else {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div className="parentDiv max-w-[1640px] mx-auto my-8 flex items-center justify-between">
      {/* Left Arrow */}
      <div className="slideArrow" onClick={prevSlide}>
        <ArrowLeftOutlined style={{ fontSize: "50px" }} />
      </div>

      {/* Slide */}
      <div className="wrapper flex justify-center">
        {slides.map((slide, index) => {
          if (index === activeSlide) {
            return (
              <div key={index} className="relative flex justify-center">
                <Image
                  src={slide.src}
                  alt=""
                  className="object-cover"
                  width={1640}
                  height={500}
                />
                <div className="absolute w-full h-full top-0 left-0 bg-gray-900/40 flex flex-col justify-center">
                  <h1 className="px-4 text-yellow-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    {slide.content.h2}
                  </h1>
                  <p className="px-4 text-orange-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.content.p}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Right Arrow */}
      <div className="slideArrow" onClick={nextSlide}>
        <ArrowRightOutlined style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export default Slider;
