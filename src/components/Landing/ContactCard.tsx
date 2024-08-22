import { IconWrapper } from "../custom";

interface ContactCardProps {
  card: { icon: JSX.Element; title: string; subtitle: string; contact: string };
}

export default function ContactCard({ card }: ContactCardProps) {
  return (
    <div className="bg-[#7878781A] p-4 sm:p-6 rounded-[30px] md:rounded-[40px] ">
      <IconWrapper className="bg-primary/10 lg:w-[70px] w-[50px] lg:h-[70px] h-[50px] text-3xl rounded-[30px] text-primary mb-8">
        {card.icon}
      </IconWrapper>

      <h3 className="text-sm md:text-2xl text-[#F9F6FB] mb-1">{card.title}</h3>
      <p className="mb-5 text-sm text-subtitle_text sm:text-base ">
        {card.subtitle}
      </p>

      <p className="text-[#F9F6FB] text-xs sm:text-base font-light">
        info@anambrastate.gov.ng
      </p>
    </div>
  );
}
