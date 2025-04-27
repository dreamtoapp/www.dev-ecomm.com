import React from "react";
import FilterBySupplier from "./FliterBySupplier";

interface FilterSectionProps {
  suppliers: any[];
}

const FilterSection: React.FC<FilterSectionProps> = ({ suppliers }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">

      <FilterBySupplier suppliers={suppliers} />
    </div>
  );
};

export default FilterSection;
