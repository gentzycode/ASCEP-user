const MakingRequest = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Making Requests</h2>
      <p className="text-subtitle_text text-base xl:text-lg">
        To make an information request:
      </p>

      <ul className="list-disc space-y-3">
        <li className="text-subtitle_text text-base xl:text-lg">
          Log in to your ASCEP Dialogue account.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Navigate to the 'Make a Request' section.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Fill out the request form with specific details about the information
          you seek.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Submit your request. You will receive a tracking number to follow its
          progress.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Remember, the clearer your request, the more precise the response you
          can expect.
        </li>
      </ul>
    </div>
  );
};

export default MakingRequest;
