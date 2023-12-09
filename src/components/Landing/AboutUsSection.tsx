export default function AboutUsSection() {
  return (
    <div className="px-[100px] grid grid-cols-2 py-[200px]">
      <img src="/public/images/landing/large-logo.svg" alt="" />

      <div>
        <p className="text-lg uppercase text-primary">About us</p>

        <h3 className="mt-3 mb-6 leading-tight text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </h3>

        <p className="text-xl text-subtle_text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
