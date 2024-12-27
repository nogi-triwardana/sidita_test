type TFormModalCreateProjectProps = {
  handleSubmit: () => void;
  isLoading?: boolean;
  positiveConfirm?: string;
} & Omit<TModalProps, "children">;