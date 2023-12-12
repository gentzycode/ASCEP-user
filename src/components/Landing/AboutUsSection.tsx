export default function AboutUsSection() {
  return (
    <div id="about-us" className="px-[100px] grid grid-cols-11">
      <div className="flex justify-center col-span-5 relative">
        <img src="/images/landing/anambra_citizens.png" alt="" className="anambra-citizens-image" />
        <div className="overlay"></div>
      </div>

      <div className="col-span-6">
        <div className="w-full max-w-[633px]">
          <p className="text-lg uppercase text-primary">ASCEP</p>

          <p className="mt-3 font-bold mb-6 leading-tight text-[36px] text-white">
            Anambra State Citizens Engagement Portal
          </p>

          <div className="text-xl text-subtitle_text">
              <p>
                Governor Soludo has initiated a pioneering step to revolutionize governance by actively engaging Anambra's citizens. Recognizing the transformative power of digital platforms, he has launched this portal to bridge the gap between the government and its people, ensuring every voice can be heard.
              </p>
              <p>
                This solution is more than a platform; it's a commitment to participatory democracy, enabling transparent dialogue, fostering collaborative decision-making, and allowing citizens to contribute constructively to state development.
              </p>
          </div>

        </div>
      </div>
    </div>
  );
}
