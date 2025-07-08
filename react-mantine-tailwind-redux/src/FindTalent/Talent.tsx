import React from "react";
import Sort from "../FindJobs/Sort"; // Reusing the Sort component
import TalentCard from "./TalentCard";
import TalentData from "../Landingpage/Data/TalentData"; // Data for talent profiles

/**
 * Talents component: Displays a grid of TalentCard components.
 * It includes a heading and a Sort component, similar to the Jobs component.
 */
const Talents = () => {
  return (
    // Container with horizontal padding and vertical padding, text color white.
    <div className="px-6 py-8 text-white">
      {/* Header section with a title and the Sort component. */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recommended Talent</h2>
        {/* Sort component for sorting talent profiles. */}
        <Sort />
      </div>

      {/* Grid container for talent cards.
          Uses flexbox with wrapping to allow 4-5 cards per row on larger screens.
          Adjust 'gap' for spacing between cards and 'justify-start' to align them. */}
      <div className="flex flex-wrap gap-4 justify-start">
        {/* Map through TalentData to render a TalentCard for each talent profile. */}
        {TalentData.map((talent) => (
          // Each TalentCard needs a unique key, using talent.id.
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  );
};

export default Talents;

