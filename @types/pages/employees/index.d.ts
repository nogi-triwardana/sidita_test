type TModalEmployeeProps = {
  handleSubmit: () => void;
  isLoading?: boolean;
  positiveConfirm?: string;
} & Omit<TModalProps, "children">;