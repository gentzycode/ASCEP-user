export default function AboutUsSection() {
  return (
    <div
      id="about-us"
      className="grid-cols-1 gap-6 space-y-6 lg:grid section-padding lg:grid-cols-11"
    >
      <div className="flex justify-center w-full lg:col-span-5 ">
        <img
          src="/images/landing/large-logo.svg"
          className="object-cover"
          alt=""
        />
      </div>

      <div className="col-span-6">
        <div className="w-full xl:max-w-[633px]">
          <p className="text-lg text-center uppercase lg:text-start text-primary">
            About us
          </p>

          <p className="mt-3 font-bold mb-6 leading-tight text-center lg:text-start text-2xl lg:text-[36px] text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>

          <div className="text-xl text-center lg:text-start text-subtitle_text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
