import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { loginInputSchema } from "../types/schema";
import { useLogin } from "@/lib/auth";
import { Loader } from "@/components/ui/loader";

type LoginFormProps = {
  onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin({
    onSuccess,
  });

  async function onSubmit(values: z.infer<typeof loginInputSchema>) {
    await loginMutation.mutateAsync({
      ...values,
    });
  }

  return (
    <div className="w-full">
      <Card.Header className="px-0">
        <Card.Title>Login</Card.Title>
        <Card.Description>
          Don't loose the level, just keep on going.
        </Card.Description>
      </Card.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 mb-6">
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                isRequired
                type="email"
                label="Email"
                placeholder="Enter your email"
                errorMessage={fieldState.error?.message}
                validationBehavior="aria"
                isInvalid={!!fieldState.error}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                isRequired
                type="password"
                label="Password"
                placeholder="Enter your password"
                errorMessage={fieldState.error?.message}
                isInvalid={!!fieldState.error}
                validationBehavior="aria"
                {...field}
              />
            )}
          />
        </div>
        <Card.Footer className="px-0">
          <Button
            className="w-full"
            type="submit"
            isDisabled={loginMutation.isPending}
          >
            {loginMutation.isPending && <Loader variant="spin" /> }
            Login
          </Button>
        </Card.Footer>
      </Form>
    </div>
  );
}
