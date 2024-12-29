import { Button, Input, Label, AtomSelect } from "@/components/atoms"
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerService } from "@/services";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
  departement: yup.string().required(),
  role: yup.string().required(),
});


const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  departement: '',
  role: '',
}

const Register = () => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { control } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerService,
    onSuccess: (res) => {
      enqueueSnackbar(res.data.message, {
        variant: 'success'
      });
      router.push('/');
    }
  });

  const handleRegister = (payload: any) => {
    registerMutation.mutate(payload);
  }

  return (
    <FormProvider {...methods}>  
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col gap-4 justify-center items-center w-[60%] p-4 bg-white rounded-lg shadow-lg">
          <h1 className="font-bold text-xl text-[#585858]">Register</h1>
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              control={control}
              controllerName="name"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              control={control}
              controllerName="email"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              control={control}
              controllerName="password"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              control={control}
              controllerName="confirmPassword"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="departement">Departement</Label>
            <Input 
              id="departement" 
              control={control}
              controllerName="departement"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="role">Role</Label>
            <AtomSelect 
              control={control}
              controllerName="role"
              options={[{ value: 'admin', label: 'Admin'}, { value: 'user', label: 'User' }]} 
            />
          </div>
          <div className="w-full">
            <a 
              href="/login"
              className="underline text-blue-500"
            >
              Login
            </a>
          </div>
          <Button
            theme="primary"
            textColor="primary"
            classnames="text-center justify-center w-full"
            onClick={() => methods.handleSubmit(handleRegister)()}
            isLoading={registerMutation.isPending}
          >
            Register
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Register;