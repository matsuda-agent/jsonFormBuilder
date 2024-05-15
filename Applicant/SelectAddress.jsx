import React, {useEffect} from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const AddressForm = ({}) => {
  const { register, control, handleSubmit, watch  , getValues} = useForm({
    defaultValues: {
      addresses: [{ streetName: '', postCode: '', movingDate: '' }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses'
  });

  const movingDates = watch('addresses');

  useEffect(() => {
    const movingDates = getValues('addresses');
    console.log('movingDates', movingDates[movingDates.length - 1]);
    if  (movingDates.length > 0 &&  Number(movingDates[movingDates.length - 1].movingDate) > 5) {
      append({ streetName: '', postCode: '', movingDate: '' });
    }
    console.log('fields', fields);
  }, [movingDates[movingDates.length - 1].movingDate]);


  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className='bg-white shadow-lg p-3 rounded-md' onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <input {...register(addresses.${index}.streetName)} placeholder="Street Name" />
          <input {...register(addresses.${index}.postCode)} placeholder="Post Code" />
          <input {...register(addresses.${index}.movingDate)} type="number" placeholder="Moving Date" className='input input-bordered' />
          <button type="button" onClick={() => remove(index)}>Delete</button>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};




export default AddressForm;