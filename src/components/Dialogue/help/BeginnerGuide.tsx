const BeginnerGuide = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Beginner’s Guide</h2>
      <p className="text-subtitle_text text-base xl:text-lg">
        Welcome to ASCEP Dialogue! Here's how to get started:
      </p>
      <ul className="list-disc space-y-3 list-inside">
        <li className="text-subtitle_text text-base xl:text-lg">
          Create an Account: Sign up to access all features.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Explore: Familiarize yourself with the layout. Check out different
          sections like 'Recent Requests', 'Discussions', and 'Help'.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Engage: Participate in discussions, comment on requests, and start
          becoming an active community member.
        </li>
      </ul>
    </div>
  );
};

export default BeginnerGuide;
