// Function to validate filters - only include filters with non-empty values
export const validateFilters = (filtersString: string) => {
  if (!filtersString) return null;

  try {
    const filtersArray = JSON.parse(filtersString);
    if (!Array.isArray(filtersArray)) return null;

    // Filter out items where value is empty, null, or undefined
    const validFilters = filtersArray.filter((filter) => {
      if (!filter) return false;

      // Handle isBetween operator - value should be an array with 2 non-empty values
      if (filter.operator === "isBetween") {
        if (!Array.isArray(filter.value)) return false;
        if (filter.value.length !== 2) return false;

        // Check if both values are not empty
        return filter.value.every(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (val: any) =>
            val !== null &&
            val !== undefined &&
            val !== "" &&
            String(val).trim() !== ""
        );
      }

      // Handle regular filters - value should not be empty
      return (
        filter.value !== null &&
        filter.value !== undefined &&
        filter.value !== "" &&
        String(filter.value).trim() !== ""
      );
    });

    // Return null if no valid filters, otherwise return the filtered array
    return validFilters.length > 0 ? validFilters : null;
  } catch (error) {
    console.warn("Invalid filters format:", error);
    return null;
  }
};
