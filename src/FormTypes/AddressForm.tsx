import React from 'react'
import  Field  from '../Fields/Field';
import { useForm, useFieldArray, FormProvider ,SubmitHandler } from 'react-hook-form';
import { FieldData  } from '@/types/InputTypes';

// this the field that will be imported from the database 
export interface AddressFieldRow {
    address_idx?: string;
    field_name: string;
    field_value: any; // Replace 'any' with the actual type if known
    field_type: string;
    title: string;
    array_index?: number;
    description: string;
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
    validation_schema?: any; // Replace 'any' with the actual type if known
  }
  
  export type AddressFieldRowFieldData = AddressFieldRow[];
  
  export interface AddressFormRenderProps {
    field_data: FieldData;
    submitFunction: (data: any) => void; // Replace 'any' with the actual type if known
  }





  interface AddressFormField {
    [key: string]: string;
  }
  


interface Attribute {
    title: string;
    description: string;
    is_required: boolean;
    field_type: string;
    options?: any; // Adjust the type as needed
    dependant_on?: any; // Adjust the type as needed
    validations?: any; // Adjust the type as needed
  }


interface AttributeObject {
    [key: string]: Attribute;
  }



interface ResponseSchema {
    addresses: AddressFormField[];
  }

export default function AddressForm({ field_data, submitFunction }: AddressFormRenderProps) {


  const transformData= (data:AddressFieldRowFieldData) : ResponseSchema => {
  const groupedData = data.reduce<{ [key:string] : AddressFormField}>((acc :{ [key: string]: any }, item:AddressFieldRow) => {
    const { address_idx , ...field } = item;
    if (address_idx !== undefined) {
        if (!acc[address_idx]) {
        acc[address_idx] = {};
        }
        acc[address_idx][field.field_name] = field.field_value;
    }
    return acc;
  }, {});
  return  { 'addresses' : Object.values(groupedData)}

};


const defaultValues: ResponseSchema = transformData(field_data);




const attributeObject:AttributeObject =  field_data.reduce((acc:AttributeObject, address:AddressFieldRow) => {
    if( !acc[address.field_name]) {
     acc[address.field_name] = {
        title: address.title,
        description: address.description,
        is_required: address.is_required,
        field_type: address.field_type,
        options: address?.options,
        dependant_on: address?.dependant_on,
        validations: address?.validation_schema
     };
    }
    return acc;
  }, {});
  

  const methods = useForm(
    {
      defaultValues:defaultValues
,
      shouldUnregister: false,
      criteriaMode: 'all',
    }
  );


  const { fields, append, remove } = useFieldArray({
    control:methods.control,
    name: 'addresses' // This matches the defaultValues' "addresses" array
  });

  const onSubmit:SubmitHandler<{addresses : {}[] }> = (data) => {
    console.log('data', data);
    submitFunction(data);
  }


  const handleAppend = () => {
    const newAddress: AddressFormField = Object.keys(fields[0])
        .filter(k => k !== 'id')
        .reduce((acc: AddressFormField, key) => {
            acc[key] = '';
            return acc;
        }, {});
    append(
        newAddress
    );
  }

  const handleRemove = (index:number) => {
    remove(index);
  }


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='Multi-Form'>
        <div className='ToolBar'>
          <button type='submit' className='submit-button'>Submit</button>
        </div>

        <div className='bg-white p-3 grid grid-cols-1 gap-4'>
           {fields.map((field , i:number) => {
            return (
            <div className='border-b p-4' key={i}>
                <div className='FieldSet'>
                    <div className='flex flex-row justify-between'>
                        <h5>Address {i+1}</h5>
                        <button onClick={() => handleRemove(i)}> Remove  </button>
                    </div>
                    {Object.keys(field).filter(k => k != 'id').map((key:string) => {
                        return (
                            <Field 
                                key={key}
                                name = {`addresses[${i}].${key}`}
                                Attributes={
                                    {
                                        type: attributeObject[key].field_type,
                                        title: attributeObject[key].title,
                                        description: attributeObject[key].description,
                                        is_required: attributeObject[key].is_required,
                                        options: attributeObject[key].options,
                                        dependant_on: attributeObject[key].dependant_on
                                    }
                                }
                                validations={attributeObject[key].validations}
                            
                            />

                    )
                    }
                )}

                </div>
            </div>
            );
            })}
        </div>

        <button type='button' className='add-button'
                                        onClick={handleAppend}
                                        >Add</button>
                    



      </form>
    </FormProvider>
  );
};
    
