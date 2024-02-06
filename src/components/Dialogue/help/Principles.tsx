interface PrinciplesProp {}
const Principles: React.FC<PrinciplesProp> = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Our Principles</h2>
      <p className="text-subtitle_text text-base xl:text-lg">
        At ASCEP Dialogue, we adhere to core principles that guide our
        operations and interactions:
      </p>
      <p className="text-subtitle_text text-base xl:text-lg">
        <span className="font-extrabold">Transparency:</span> We believe in the
        power of openness. Every government action, decision, and policy should
        be visible and understandable to the public.
      </p>
      <p className="text-subtitle_text text-base xl:text-lg">
        <span className="font-extrabold">Accountability:</span> Our platform is
        a tool for holding public officials and entities accountable, ensuring
        they act in the best interest of the community.
      </p>
      <p className="text-subtitle_text text-base xl:text-lg">
        <span className="font-extrabold">Participation:</span> We encourage
        active citizen participation. Every voice matters, and every opinion
        counts in shaping the future of Anambra State.
      </p>
    </div>
  );
};

export default Principles;
