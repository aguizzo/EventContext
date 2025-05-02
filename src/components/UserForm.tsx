import type { ComponentPropsWithoutRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

type FormPropsType = ComponentPropsWithoutRef<"form"> & {
  onSubmit: (user: { email: string; password: string }) => void;
};

const UserForm = ({ ...props }: FormPropsType) => {
  const nameError = "something";
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        };
        props.onSubmit(user);
      }}
      className="flex flex-col gap-4"
    >
      <Input
        error={
          nameError
            ? {
                children: nameError,
              }
            : undefined
        }
        name="name"
        label={{ children: "Name" }}
        required
      />
      <Input
        name="password"
        type="password"
        label={{ children: <b>Password</b> }}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UserForm;
