import { Button } from "@/components/atoms";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const ConfirmationModal: React.FC<TModalProps> = ({
  title = '',
  open, 
  onClose,
  onSubmit,
  children,
  isLoading,
  positiveConfirm = "Yes",
  negativeConfirm = "Cancel",
}) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <div 
          className="flex items-center justify-center fixed inset-0 w-screen h-screen bg-black/70 z-20"
        >
          <motion.div
            className="bg-white w-1/2 rounded-lg p-4"
          >
            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
              </div>
              <Button
                startIcon={<RxCross2 className="font-semibold" />}
                onClick={() => onClose()}
              />
            </div>
            {children}
            <div
              className="flex justify-end w-full"
            >
              <div className="flex gap-2 items-center">
                <Button
                  onClick={onClose}
                  theme="secondary"
                  textColor="secondary"
                >
                  {negativeConfirm}
                </Button>
                <Button
                  onClick={onSubmit}
                  isLoading={isLoading}
                  theme="primary"
                  textColor="primary"
                >
                  {positiveConfirm}
                </Button>
                </div>
            </div>
          </motion.div>          
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;