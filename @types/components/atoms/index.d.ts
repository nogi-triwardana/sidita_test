
type TLabelProps = {
  children?: React.ReactNode;
  htmlFor?: string;
};

type TInputProps = {
  control?: Control<any>;
  controllerName?: string;
  asController?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TButtonProps = {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  theme?: string;
  textColor?: string;
  classnames?: string;
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type TSelectProps = {
  options?: { value: string; label: string }[];
  control?: Control<any>;
  controllerName?: string;
  asController?: boolean;
} & SelectProps;