import classNames from "classnames";
import { FC } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  className: string;
  onSubmit?: VoidFunction;
};

const FormProvider: FC<Props> = ({ children, onSubmit, methods, className }) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} className={classNames([className])}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
