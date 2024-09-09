import React from 'react'
import  Field  from '../Fields/Field';
import { useForm , SubmitHandler , FormProvider  } from 'react-hook-form';

import {Button } from '../UI/Button'



export interface SingleFieldRow {
    loan_application_id?: string;
    field_name: string;
    field_value: any; // Replace 'any' with the actual type if known
    field_type: string;
    title: string;
    disabled?: boolean;
    description: string;
    is_required: boolean;
    options?: any; // Replace 'any' with the actual type if known
    dependant_on?: any; // Replace 'any' with the actual type if known
    validation_schema?: object; // Replace 'any' with the actual type if known
    hidden?: boolean;
}


interface Attribute {
    title: string;
    description: string;
    is_required: boolean;
    field_type: string;
    disabled?: boolean;
    options?: any; // Adjust the type as needed
    dependant_on?: any; // Adjust the type as needed
    validations?: any; // Adjust the type as needed
    hidden?: boolean;
}

interface AttributeObject {
    [key: string]: Attribute;
}




// define repsone scheme to be data:with the key as the field name and the value as the field value
interface ResponseSchema {
    [key: string]: any;
}


export interface SingleFormRenderProps {
    field_data: SingleFieldRow[];
    submitFunction: (data: any) => void; // Replace 'any' with the actual type if known
}

const SingleForm:React.FC<SingleFormRenderProps> = ({field_data , submitFunction}) => {

        const [submitting, setSubmitting] = React.useState(false);

        const defaultValues = field_data.reduce<{ [key: string]: any }>((acc, item:SingleFieldRow) => {
            acc[item.field_name] = item.field_value;
            return acc;
        } , {});



        const attributeObject:AttributeObject = field_data.reduce((acc: AttributeObject, item:SingleFieldRow) => {
            acc[item.field_name] = {
                title: item.title,
                description: item.description,
                is_required: item.is_required,
                field_type: item.field_type,
                disabled: item.disabled,
                options: item.options,
                dependant_on: item.dependant_on,
                validations: item.validation_schema,
                hidden: item.hidden
            }
            return acc;
        }, {})


        const methods = useForm<ResponseSchema>({
            defaultValues : defaultValues
            , shouldUnregister: false
            , criteriaMode: "all"


        });

        const onSubmit:SubmitHandler<ResponseSchema> = (data) => {
            setSubmitting(true);
            try {
                const formattedData = Object.keys(data).map((key) => {
                    const fieldMeta = field_data.find((field) => field.field_name === key);

                    return {
                        field_name: key,
                        field_value: data[key],
                        ...fieldMeta
                    }
                })

                submitFunction(formattedData)

            } catch (error) {
                console.log('Error', error)
            } finally {
                setSubmitting(false)
            }
        
          }
        



    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='Single-Form'>
                        <div className='FieldSet'>
                                {
                                    Object.keys(defaultValues).map((key , index) => {
                                        return (
                                            <Field 
                                                key={index}
                                                name={key}
                                                Attributes={
                                                    {
                                                        type: attributeObject[key].field_type,
                                                        title: attributeObject[key].title,
                                                        description: attributeObject[key].description,
                                                        is_required: attributeObject[key].is_required,
                                                        options: attributeObject[key].options,
                                                        dependant_on: attributeObject[key].dependant_on,
                                                        disabled: attributeObject[key]?.disabled,
                                                        hidden: attributeObject[key]?.hidden
                                                    }
                                                }
                                                validations={attributeObject[key].validations}
                                            />
                                        )
                                    })
                                }
                        </div>

                <div className='flex space-x-4 mt-10'>
                    <Button type='submit' className='min-w-[200px]' isLoading={submitting} loadingText='Submitting Data'>Submit</Button>
                </div>

            </form>
        </FormProvider>
    )



}

export default SingleForm;