import React from "react";
import { TextInput, Select } from "@mantine/core";
// THIS IS THE CRITICAL LINE: Ensure this path correctly points to your SearchDataTalent.ts file.
import SearchDataTalent from "../FindTalent/SearchDataTalent";
import { IconBriefcase, IconMapPin, IconStars, IconCurrencyDollar, IconCalendarEvent } from "@tabler/icons-react"; // Import necessary icons for type checking

// Define an interface for the structure of each item in SearchDataTalent.
// This ensures TypeScript knows what properties to expect when mapping over SearchDataTalent.
interface SearchDataItem {
  icon: React.ElementType; // Use React.ElementType for the icon component
  placeholder: string;
  type: "text" | "select";
  data?: string[]; // Optional data property for select type inputs
}

// Common Tailwind CSS class for icons positioned within input fields.
const iconClass =
  "absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none z-10";

/**
 * MultiInput component for the FindTalent search bar.
 * It dynamically renders either a TextInput or a Select component
 * based on the 'type' defined in SearchDataTalent.
 */
const MultiInput = () => {
  return (
    // Full width container with padding, background, and shadow.
    <div className="w-full px-6 py-4 bg-mine-shaft-950 rounded-xl shadow-md">
      {/* Flex container for arranging input fields, with responsive gaps and justification. */}
      <div className="flex gap-6 flex-wrap justify-center lg:justify-between xl:gap-8">
        {/*
          This .map() call now correctly iterates over the 'SearchDataTalent' array,
          which contains objects matching the 'SearchDataItem' interface.
        */}
        {SearchDataTalent.map((item: SearchDataItem, index: number) => {
          // Dynamically get the icon component from the item data.
          const IconComponent = item.icon;

          return (
            // Relative container for positioning the icon within the input field.
            <div key={index} className="relative w-64 min-w-[240px] flex-shrink-0">
              {/* Render the icon component with the defined class. */}
              <IconComponent size={20} className={iconClass} />

              {/* Conditionally render Select or TextInput based on item.type. */}
              {item.type === "select" ? (
                <Select
                  placeholder={item.placeholder}
                  data={item.data || []} // Provide an empty array as fallback if data is undefined
                  className="w-full"
                  searchable // Allow searching within select options
                  clearable // Allow clearing the selected value
                  styles={{
                    // Custom styles for Mantine's Select component to match theme.
                    input: {
                      backgroundColor: "#2d2d2d",
                      borderColor: "#4f4f4f",
                      color: "white",
                      paddingLeft: "2.5rem", // Space for the icon
                      borderRadius: "9999px", // Fully rounded corners
                    },
                    dropdown: {
                      backgroundColor: "#2d2d2d",
                      color: "white",
                      border: "1px solid #4f4f4f",
                    },
                    option: {
                      backgroundColor: "#2d2d2d",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#facc15 !important", // Yellow on hover
                        color: "black !important",
                      },
                      "&[data-selected]": {
                        backgroundColor: "#facc15 !important", // Yellow when selected
                        color: "black !important",
                      },
                    },
                  }}
                />
              ) : (
                <TextInput
                  placeholder={item.placeholder}
                  className="w-full"
                  styles={{
                    // Custom styles for Mantine's TextInput component to match theme.
                    input: {
                      backgroundColor: "#2d2d2d",
                      borderColor: "#4f4f4f",
                      color: "white",
                      paddingLeft: "2.5rem", // Space for the icon
                      borderRadius: "9999px", // Fully rounded corners
                    },
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiInput;

