import React , {useState} from 'react'
import  Field  from '../Fields/Field';
import { useForm, useFieldArray, FormProvider ,SubmitHandler } from 'react-hook-form';
import { FieldData  } from '@/types/InputTypes';
import {Button } from '../UI/Button';
import { flatMap } from 'lodash-es';

// this the field that will be imported from the database 
export interface AddressFieldRow {
    applicant_loan_application_id: string;
    field_name: string;
    field_value: any; // Replace 'any' with the actual type if known
    field_type: string;
    title: string;
    disabled: boolean;
    array_index?: string;
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
    disabled: boolean;
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

const [submitting , setSubmitting] = useState(false);
  
  const transformData= (data:AddressFieldRowFieldData) : ResponseSchema => {
  const groupedData = data.reduce<{ [key:string] : AddressFormField}>((acc :{ [key: string]: any }, item:AddressFieldRow) => {
    const { array_index , ...field } = item;
    if (array_index !== undefined) {
        if (!acc[array_index]) {
        acc[array_index] = {};
        acc[array_index].applicant_loan_application_id = field.applicant_loan_application_id;
       
        }
        acc[array_index][field.field_name] = field.field_value;
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
        disabled: address.disabled,
        options: address?.options,
        dependant_on: address?.dependant_on,
        validations: address?.validation_schema,
        
     };
    }
    return acc;
  }, {});
  

  const methods = useForm<ResponseSchema>(
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
    setSubmitting(true);
    try {
        const formattedData = data.addresses.map((address:AddressFormField , i:number) => {
            return  Object.entries(address)
                    .filter(([key, _]) => key !== 'applicant_loan_application_id')      
                    .map(([field_name, field_value]) => {
                const fieldMeta = field_data.find((field:AddressFieldRow) => field.field_name === field_name && field.applicant_loan_application_id === address.applicant_loan_application_id);
                if (fieldMeta) {
                    const { id, applicant_loan_application_id, ...filteredFieldMeta } = fieldMeta;
                    return {
                      ...filteredFieldMeta,
                      field_value,
                        applicant_loan_application_id,
                      array_index: i.toString()
                    };
                  }
                return null;
            }
            );
        });

        // make formattedData flat
        const flatData = flatMap(formattedData);

        submitFunction(flatData);
    } catch (error) {
        console.log('error', error);
    }  finally {
        setSubmitting(false);
    }




  }


  const handleAppend = () => {
    const newAddress: AddressFormField = Object.keys(fields[0])
        .filter(k => k !== 'id')
        .reduce((acc: AddressFormField, key) => {
            if (key === 'applicant_loan_application_id') {
                acc[key] =  fields[0][key];
                return acc;
            }

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
        <div className='Field-Grid'>
           {fields.map((field , i:number) => {
            return (
            <div className='Field-Section' key={i}>
                <div className='flex flex-row justify-between'>
                    <h5>Address {i+1}</h5>
                    { i > 0 ? <Button variant='destructive' onClick={() => handleRemove(i)}> Remove  </Button> : null}
                </div>
                <div className='FieldSet'>
                    {Object.keys(field).filter(k => k != 'id').map((key:string) => {
                        if(key === "applicant_loan_application_id") {
                            return (
                                <input
                                    key={key}
                                    className='px-2 hidden'
                                    {...methods.register(`addresses.${i}.${key}` as const)}
                                    disabled
                                />
                            )
                        }
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
                                        dependant_on: attributeObject[key].dependant_on,
                                        disabled: attributeObject[key].disabled
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

      
        <div className='flex space-x-4 mt-10'>
            <Button type='submit' className='min-w-[200px]' isLoading={submitting} loadingText='Submitting Data'>Submit</Button>
            <Button type='button'   className='min-w-[200px]'  variant="secondary" onClick={handleAppend}>Add + </Button>
        </div>
                    



      </form>
    </FormProvider>
  );
};
    
