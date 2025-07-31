import React, { useState } from "react";
import MultiInput from "./MultiInput";

const SearchBar = () => {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([5, 25]);

  return (
    <div className="w-full bg-mine-shaft-950 px-6 py-6">
      <MultiInput />
    </div>
  );
};

export default SearchBar;