import type { ComponentPropsWithoutRef } from "react";

interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  htmlFor: string;
}

const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      htmlFor={htmlFor}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {children}
    </label>
  );
};

type ErrorFieldProps = ComponentPropsWithoutRef<"p">;

const ErrorField = ({ children, ...props }: ErrorFieldProps) => {
  return (
    <p {...props} className="text-red-500 text-xs italic">
      {children}
    </p>
  );
};

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  name: string; // Required
  label?: Omit<LabelProps, "htmlFor">;
  error?: ErrorFieldProps;
}

const Input = ({ ...props }: InputProps) => {
  const defaultInput = (
    <input {...props} className="border border-gray-300 p-2 rounded" />
  );

  if (!props.label) {
    return defaultInput;
  }

  return (
    <div className="mb-4">
      <Label {...props.label} htmlFor={props.name} />
      {defaultInput}
      <ErrorField {...props.error}/>
    </div>
  );
};

export { Input, Label };
