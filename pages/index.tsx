import { Button, Input, Label } from "@/components/atoms"
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


const defaultValues = {
  email: '',
  password: ''
};

type TDefaultValues = {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required()
});

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const methods = useForm<TDefaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { control, watch } = methods;
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: watch('email'),
      password: watch('password'),
      callbackUrl: `${window.location.origin}/attendances`
    }).finally(() => setIsLoading(false));

    if(result?.ok) {
      router.push('/projects');
    } else {

    }
  }

  return (
    <FormProvider {...methods}>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col gap-4 justify-center items-center w-[60%] p-4 bg-white rounded-lg shadow-lg">
          <h1 className="font-bold text-xl text-[#585858]">Login</h1>
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input 
              control={control} 
              controllerName="email"
              id="email" 
            />
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input 
              control={control}
              controllerName="password"
              id="password" 
              type="password" 
            />
          </div>
          <div className="w-full">
            <Link 
              href="/register"
              className="underline text-blue-500"
            >
              Register
            </Link>
          </div>
          <Button
            theme="primary"
            textColor="primary"
            classnames="text-center justify-center w-full"
            onClick={() => methods.handleSubmit(handleSubmit)()}
            isLoading={isLoading}
          >
            Login
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
