import React from 'react';
import Field from './Fields/Field';
import { FieldType } from './Fields/FieldAttributes'; // Ensure this matches your actual import path
import { useForm, FormProvider } from 'react-hook-form';

// Define your form schema using the FieldType constants
const formSchema = [
  {
    id: "fullName",
    title: "Full Name",
    description: "Please enter your full name",
    type: FieldType.TEXT,
    isMandatory: true
  },
  {
    id: "favAnimal",
    title: "What is Your Favourite Pet?",
    description: "Select your favourite animal",
    type: FieldType.SELECT,
    options: [
      { label: "Dog 🐶", value: "dog" },
      { label: "Cat 😺", value: "cat" },
      { label: "Bird 🐦", value: "bird" },
      { label: "Fish 🐟", value: "fish" },
      { label: "Tasmanian Devil 😈", value: "devil" },
    ],
    isMandatory: true
  },
  {
    id: "middleName",
    title: "Middle Name",
    description: "Please enter your middle name",
    type: FieldType.TEXT,
    isMandatory: true
  },
  // {
  //   id: "addressForm",
  //   title: "addressForm",
  //   description: "Please enter your middle name",
  //   type: FieldType.ADDRESS,
  //   isMandatory: true
  // },
];

function ApplicantForm() {
  const methods = useForm();
  return (
    <main className="main">
      <h1>Dynamic Form Example</h1>
      <FormProvider {...methods}>
        <form>
          {formSchema.map(field => (
              <Field key={field.id} {...field} />
          ))}
        </form>
      </FormProvider>
    </main>
  );
}

export default ApplicantForm;

