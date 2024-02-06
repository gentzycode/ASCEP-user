import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import TestimonialQuote from "./TestimonialQuote";
import useScreenWidth from "@/hooks/useScreenWidth";

export default function Testimonials() {
  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { screenWidth } = useScreenWidth();

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

  return (
    <div
      className="flex flex-col grid-cols-11 gap-10 py-20 xl:gap-0 xl:grid"
      style={{
        direction: "rtl",
      }}
    >
      <div
        style={{
          direction: "ltr",
        }}
        className="flex items-center col-span-5 text-center xl:text-start flex-col justify-center gap-4 px-6  xl:pl-[70px] xl:pr-[100px]"
      >
        <div className="max-w-[600px] space-y-4 mb-4">
          <p className="text-lg text-primary">TESTIMONIALS</p>

          <h2 className="text-xl text-white md:text-2xl">
            What Citizens say about us
          </h2>
        </div>

        <p className="text-lg md:text-2xl text-subtle_text max-w-[600px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="hidden xl:inline-block">
          <TestimonialPagination
            goNext={goNext}
            goPrev={goPrev}
            activeIndex={activeIndex}
          />
        </div>
      </div>
      <div className="col-span-6 space-y-7 section-padding xl:px-0">
        <Swiper
          ref={swiperRef}
          navigation={true}
          modules={[Navigation]}
          slidesPerView={screenWidth > 1280 ? 1.5 : 1}
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

        <div
          style={{
            direction: "ltr",
          }}
          className="flex justify-start xl:hidden"
        >
          <TestimonialPagination
            goNext={goNext}
            goPrev={goPrev}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </div>
  );
}

interface TestimonialPaginationProps {
  goPrev: () => void;
  goNext: () => void;
  activeIndex: number;
}

const TestimonialPagination = ({
  goPrev,
  activeIndex,
  goNext,
}: TestimonialPaginationProps) => (
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
);

const array = [1, 2, 3, 4, 5];
