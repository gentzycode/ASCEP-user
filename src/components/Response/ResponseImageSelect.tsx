export default function ResponseImageSelect() {
  return (
    <div className="grid grid-cols-11 h-[300px]">
      <div className="col-span-6">
        <img
          src="/images/response-img.png"
          className="object-cover w-full h-full rounded-[40px] "
          alt=""
        />
      </div>
      <div className="relative grid h-full grid-cols-2 col-span-5 gap-4 overflow-y-auto ">
        {imgs.map((img) => (
          <img src={img.img} alt="image" key={img.id} />
        ))}
      </div>
    </div>
  );
}

const imgs = [
  {
    id: 1,
    img: "/images/response-img.png",
  },
  {
    id: 2,
    img: "/images/response-img.png",
  },
  {
    id: 3,
    img: "/images/response-img.png",
  },
  {
    id: 4,
    img: "/images/response-img.png",
  },
  {
    id: 5,
    img: "/images/response-img.png",
  },
  {
    id: 6,
    img: "/images/response-img.png",
  },
  {
    id: 8,
    img: "/images/response-img.png",
  },
  {
    id: 9,
    img: "/images/response-img.png",
  },
];
