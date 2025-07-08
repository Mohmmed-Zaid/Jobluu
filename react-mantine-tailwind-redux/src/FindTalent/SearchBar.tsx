import React from "react";
import MultiInput from "./MultiInput";

/**
 * SearchBar component for the FindTalent page.
 * This component acts as a wrapper for the MultiInput component,
 * specifically tailored for talent search criteria.
 */
const SearchBar = () => {
  // No specific state needed here for now, as MultiInput handles its own state
  // and data mapping. This component primarily provides structural context.
  return (
    // Container for the search bar, applying background and padding styles.
    <div className="w-full bg-mine-shaft-950 px-6 py-6">
      {/* MultiInput component renders various search fields based on SearchDataTalent */}
      <MultiInput />
    </div>
  );
};

export default SearchBar;

