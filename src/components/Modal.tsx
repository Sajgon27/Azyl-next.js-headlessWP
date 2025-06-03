import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode; // Dynamic buttons
}

function Modal({ isOpen, title = "Potwierdzenie", children, actions }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
        <div className="flex justify-end gap-4 mt-4">{actions}</div>
      </motion.div>
    </div>
  );
}

export default Modal;
