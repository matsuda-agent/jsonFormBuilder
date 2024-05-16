export const formSchema = [
  {
    id: "title",
    title: "Title",
    description: "Your title (e.g., Mr, Mrs, Miss, Dr)",
    type: "text",
    is_mandatory: true,
  },
  {
    id: "forename",
    title: "Forename",
    description: "Your first name",
    type: "text",
    is_mandatory: true,
  },
  {
    id: "middleName",
    title: "Middle name",
    description: "Your middle name",
    type: "text",
    is_mandatory: false,
  },
  {
    id: "surname",
    title: "Surname",
    description: "Your last name",
    type: "text",
    is_mandatory: true,
  },
  {
    id: "previousName",
    title: "Maiden / Previous Name",
    description: "Your maiden name or any previous names",
    type: "text",
    is_mandatory: false,
  }
];
