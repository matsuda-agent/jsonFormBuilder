// types.ts

// this the field that will be imported from the database 
export interface FieldRow {
    applicant_loan_application_id: string;
    field_name: string;
    field_value: any; // Replace 'any' with the actual type if known
    field_type: string;
    title: string;
    disabled: boolean;
    address_idx?: string;
    description: string;
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
    validation_schema?: any; // Replace 'any' with the actual type if known
  }
  
  export type FieldData = FieldRow[];
  
  export interface MultiFormRenderProps {
    field_data: FieldData;
    submitFunction: (data: any) => void; // Replace 'any' with the actual type if known
  }
  

//   this is the field that will be used in the form
  export interface FormField {
    field_name: string;
    field_value: any; // Replace 'any' with the actual type if known
    field_type: string;
    title: string;
    disabled: boolean;
    description: string;
    is_required: boolean;
    array_index?: number;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
    validation_schema?: any; // Replace 'any' with the actual type if known
  }
  