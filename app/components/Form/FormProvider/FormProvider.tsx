import classNames from "classnames";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  className: string;
  onSubmit?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, methods, className }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={classNames([className])}>
        {children}
      </form>
    </Form>
  );
}
