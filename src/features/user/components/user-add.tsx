import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { Form } from "@/components/ui/form";
import { Sheet } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userCreateInputSchema } from "../types/schema";
import { useCreateUser } from "../api/add-user";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";

const roles = [
  { id: "admin", name: "Admin" },
  { id: "user", name: "User" },
];

export const UserAdd = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(userCreateInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset({ name: "", email: "", password: "", role: "" });
    }
  }, [isOpen, reset]);

  const userCreateMutation = useCreateUser();

  async function onSubmit(values: z.infer<typeof userCreateInputSchema>) {
    await userCreateMutation.mutateAsync({ data: values });
    setIsOpen(false);
    reset({ name: "", email: "", password: "", role: "" });
  }

  return (
    <>
      <Button className="my-5" onPress={() => setIsOpen(true)}>
        Add User
      </Button>
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Content>
          <Sheet.Header>
            <Sheet.Title>Add User</Sheet.Title>
            <Sheet.Description>Add a new user to the system</Sheet.Description>
          </Sheet.Header>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Sheet.Body className="space-y-4">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <TextField
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    errorMessage={fieldState.error?.message}
                    validationBehavior="aria"
                    isInvalid={!!fieldState.error}
                    {...field}
                  />
                )}
              />
              {/* email */}
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextField
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    errorMessage={fieldState.error?.message}
                    validationBehavior="aria"
                    isInvalid={!!fieldState.error}
                    {...field}
                  />
                )}
              />
              {/* password */}
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <TextField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    errorMessage={fieldState.error?.message}
                    validationBehavior="aria"
                    isInvalid={!!fieldState.error}
                    {...field}
                  />
                )}
              />
              {/* role */}
              <Controller
                control={control}
                name="role"
                render={({ field, fieldState }) => (
                  <ComboBox
                    placeholder="Select a Role"
                    label="Role"
                    errorMessage={fieldState.error?.message}
                    validationBehavior="aria"
                    isInvalid={!!fieldState.error}
                    onSelectionChange={(value) => {
                      field.onChange(value);
                    }}
                    {...field}
                  >
                    <ComboBox.Input />
                    <ComboBox.List items={roles}>
                      {(item) => (
                        <ComboBox.Option id={item.id} textValue={item.name}>
                          {item.name}
                        </ComboBox.Option>
                      )}
                    </ComboBox.List>
                  </ComboBox>
                )}
              />
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>Cancel</Sheet.Close>
              <Button
                intent="primary"
                type="submit"
                isDisabled={userCreateMutation.isPending}
              >
                {userCreateMutation.isPending && <Loader variant="spin" />}
                Save Changes
              </Button>
            </Sheet.Footer>
          </Form>
        </Sheet.Content>
      </Sheet>
    </>
  );
};
