const NoResponse = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Didn’t Get a Response?</h2>

      <p className="text-subtitle_text text-base xl:text-lg">
        If you didn't receive a response within the legally stipulated
        timeframe:
      </p>
      <p className="text-subtitle_text text-base xl:text-lg">
        <span className="font-extrabold">Check the Status:</span> Ensure your
        request was submitted correctly and is being processed.
      </p>
      <p className="text-subtitle_text text-base xl:text-lg">
        <span className="font-extrabold">Contact Support:</span>
        Reach out to our support team for assistance in following up on your
        request.
      </p>
    </div>
  );
};

export default NoResponse;
