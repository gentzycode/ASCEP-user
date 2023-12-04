import { ResponseActivity } from "@/components/Main";

export default function MapView() {
  return (
    <div className="h-[calc(100%-70px)] relative ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.9863678332863!2d7.443356675068624!3d9.065005688424224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b2926015b41%3A0xfb8f89ab0da2667c!2sUtako%20Ultra%20Modern%20Market%2C%20Utako%2C%20Abuja%20900108%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1701696278187!5m2!1sen!2sng"
        className="w-full h-full shadow rounded-[20px]"
        //   style="border:0;"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="absolute shadow bottom-40 left-64 w-fit h-fit rounded-[40px]">
        <ResponseActivity />
      </div>
    </div>
  );
}
