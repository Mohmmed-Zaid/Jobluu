// SearchDataTalent.ts
// This file defines the configuration for the search input fields
// specifically for the "Find Talent" section.

import {
  IconBriefcase,
  IconMapPin,
  IconStars,
  IconCurrencyDollar,
  IconCalendarEvent,
} from "@tabler/icons-react";

const SearchDataTalent = [
  {
    icon: IconBriefcase, // Icon for job title/role
    placeholder: "Role (e.g., Software Engineer)",
    type: "text",
  },
  {
    icon: IconMapPin, // Icon for location
    placeholder: "Location (e.g., Pune)",
    type: "text",
  },
  {
    icon: IconStars, // Icon for skills
    placeholder: "Skills (e.g., React, Python)",
    type: "text",
  },
  {
    icon: IconCurrencyDollar, // Icon for expected salary
    placeholder: "Expected Salary",
    type: "select", // Using select for salary ranges
    data: [
      "10 - 20 LPA",
      "20 - 30 LPA",
      "30 - 40 LPA",
      "40 - 50 LPA",
      "50 - 60LPA",
      "60+ LPA",
    ],
  },
  {
    icon: IconCalendarEvent, // Icon for experience level
    placeholder: "Experience Level",
    type: "select", // Using select for experience levels
    data: ["Entry-level", "Junior", "Mid-level", "Senior", "Lead", "Principal"],
  },
];

export default SearchDataTalent;

