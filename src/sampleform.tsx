import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";

import { Button } from "@headlessui/react";


type Inputs = {
  example: string;
  exampleRequired: string;
};

export function SampleForm() {
    const [counter , setCounter] = useState(0);

    function handleClick() {
        setCounter(counter + 1);
    }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    

  return (
    <>
  <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <Button type='submit'> Submit </Button>
      <Button type='submit'> Submit </Button>
    </form>
   </>
  );
}