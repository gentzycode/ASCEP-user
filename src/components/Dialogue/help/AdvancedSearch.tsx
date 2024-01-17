const AdvancedSearch = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-text text-xl xl:text-3xl">Advanced Search</h2>
      <p className="text-subtitle_text text-base xl:text-lg">
        Our advanced search feature lets you fine-tune your searches:
      </p>
      <ul className="list-disc space-y-3 list-inside">
        <li className="text-subtitle_text text-base xl:text-lg">
          Use filters like date range, category, or department to narrow down
          results.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Try keywords related to your topic of interest.
        </li>
        <li className="text-subtitle_text text-base xl:text-lg">
          Combine different search criteria for more precise results.
        </li>
      </ul>
    </div>
  );
};

export default AdvancedSearch;
