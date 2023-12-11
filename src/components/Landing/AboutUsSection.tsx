export default function AboutUsSection() {
  return (
    <div id="about-us" className="px-[100px] grid grid-cols-11">
      <div className="flex justify-center col-span-5">
        <img src="/images/landing/large-logo.svg" alt="" />
      </div>

      <div className="col-span-6">
        <div className="w-full max-w-[633px]">
          <p className="text-lg uppercase text-primary">About us</p>

          <p className="mt-3 font-bold mb-6 leading-tight text-[36px] text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>

          <div className="text-xl text-subtitle_text">
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
