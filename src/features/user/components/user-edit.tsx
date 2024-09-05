import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import { Form } from "@/components/ui/form";
import { Sheet } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { userEditInputSchema } from "../types/schema";
import { z } from "zod";
import { Loader } from "@/components/ui/loader";
import { useEffect } from "react";
import { useUserById } from "../api/get-user";
import { useEditUser } from "../api/edit-user";

const roles = [
  { id: "admin", name: "Admin" },
  { id: "user", name: "User" },
];

export const UserEdit = ({
  userId,
  isModalOpen,
  setIsModalOpen,
}: {
  userId: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  const userQuery = useUserById({ userId });

  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(userEditInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // set values when user is fetched
  useEffect(() => {
    reset(userQuery.data);
  }, [userQuery.data, reset]);

  useEffect(() => {
    if (!isModalOpen) {
      reset({ name: "", email: "", password: "", role: "" });
    }
  }, [isModalOpen, reset]);

  const userEditMutation = useEditUser();

  async function onSubmit(values: z.infer<typeof userEditInputSchema>) {
    if (values.password === "") {
      delete values.password;
    }
    await userEditMutation.mutateAsync({ data: values, userId });
    setIsModalOpen(false);
    reset({ name: "", email: "", password: "", role: "" });
  }

  return (
    <>
      <Sheet.Content isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Sheet.Header>
          <Sheet.Title>Edit User</Sheet.Title>
          <Sheet.Description>Edit a new user to the system</Sheet.Description>
        </Sheet.Header>
        {userQuery.isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader size="large" />
          </div>
        ) : (
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
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isDisabled={field.disabled}
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
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isDisabled={field.disabled}
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
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    isDisabled={field.disabled}
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
                    name={field.name}
                    onBlur={field.onBlur}
                    selectedKey={field.value}
                    onSelectionChange={(value) => {
                      field.onChange(value);
                    }}
                    isDisabled={field.disabled}
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
                isDisabled={userEditMutation.isPending}
              >
                {userEditMutation.isPending && <Loader variant="spin" />}
                Save Changes
              </Button>
            </Sheet.Footer>
          </Form>
        )}
      </Sheet.Content>
    </>
  );
};
