import { IconWrapper } from "../custom";

interface ContactCardProps {
  card: { icon: JSX.Element; title: string; subtitle: string; contact: string };
}

export default function ContactCard({ card }: ContactCardProps) {
  return (
    <div className="bg-[#7878781A] p-6 rounded-[40px] ">
      <IconWrapper className="bg-primary/10 w-[70px] h-[70px] text-3xl rounded-[30px] text-primary mb-8">
        {card.icon}
      </IconWrapper>

      <h3 className="text-2xl text-[#F9F6FB] mb-1">{card.title}</h3>
      <p className="mb-5 text-subtitle_text">{card.subtitle}</p>

      <p className="text-[#F9F6FB]">sales@paybox360.com</p>
    </div>
  );
}
