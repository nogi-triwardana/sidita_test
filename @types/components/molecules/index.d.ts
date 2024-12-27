type TTableProps = {
  dataSource?: any[] | [];
  columns: {
    index: string;
    label: string;
    isShow?: boolean;
  }[];
  isLoading?: boolean;
  createable?: boolean;
  onCreate?: () => void;
  customFilter?: React.ReactNode;
};

type TModalProps = {
  title?: string;
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  positiveConfirm?: string;
  negativeConfirm?: string;
};