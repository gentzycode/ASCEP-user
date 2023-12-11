import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import TestimonialQuote from "./TestimonialQuote";

export default function Testimonials() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  console.log(activeIndex);
  return (
    <div
      className="grid grid-cols-11 py-20"
      style={{
        direction: "rtl",
      }}
    >
      <div
        style={{
          direction: "ltr",
        }}
        className="flex col-span-5 flex-col justify-center gap-4  pl-[70px] pr-[100px]"
      >
        <div>
          <p className="text-lg text-primary">TESTIMONIALS</p>

          <h2 className="text-white">What Citizens say about us</h2>
        </div>

        <p className="text-2xl text-subtle_text ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="flex items-center gap-4 text-4xl">
          <div
            onClick={goPrev}
            className={`tesimonial-pagination ${
              activeIndex === 0 ? "opacity-30" : ""
            } `}
          >
            <VscChevronLeft />
          </div>
          <div
            onClick={goNext}
            className={`tesimonial-pagination ${
              activeIndex === array.length - 1 ? "opacity-30" : ""
            } `}
          >
            <VscChevronRight />
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <Swiper
          ref={swiperRef}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={1.5}
          spaceBetween={60}
          className="mySwiper"
          direction="horizontal"
          onActiveIndexChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {array.map((_, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialQuote active={idx === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

const array = [1, 2, 3, 4, 5];
