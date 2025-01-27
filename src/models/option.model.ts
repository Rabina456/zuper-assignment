export interface Option {
    id: string; // Unique identifier for the option
    label: string; // Display label of the option
    value: string; // Value of the option
    order?: number; // Position of the option (for reordering dropdown/radio items)
  }
  