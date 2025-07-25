import React, { useState } from "react";
import {
  Button,
  Combobox,
  useCombobox,
  Text,
  Box,
} from "@mantine/core";
import { IconAdjustments } from "@tabler/icons-react";

const optionsData = [
  "Relevance",
  "Most Recent",
  "Salary (Low to High)",
  "Salary (High to Low)",
];

const Sort = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Relevance");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = optionsData.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={250}
      position="bottom-start"
      withArrow
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <div
          className="flex items-center justify-between gap-2 border border-bright-sun-400 px-4 py-2 rounded-full cursor-pointer hover:bg-[#2d2d2d] transition"
          onClick={() => combobox.toggleDropdown()}
        >
          <span className="text-white text-sm">
            {selectedItem || "Sort by"}
          </span>
          <IconAdjustments size={18} className="text-yellow-400" />
        </div>
      </Combobox.Target>

      <Combobox.Dropdown className="bg-mine-shaft-950 text-white border border-gray-600 rounded-md">
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;
