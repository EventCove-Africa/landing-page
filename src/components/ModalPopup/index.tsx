import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ModalPopupProps {
  isOpen: boolean;
  closeModal?: () => void;
  children: React.ReactNode;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ children, isOpen, closeModal }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // Set the portal root on the client side after mount
  useEffect(() => {
    const root = document.getElementById("modal");
    if (root) {
      setPortalRoot(root);
    } else {
      console.warn("No element with id 'modal' found in the document.");
    }
  }, []);

  const handleAnimationComplete = () => {
    if (isExiting && closeModal) {
      closeModal();
      setIsExiting(false); // Reset the exit state
    }
  };

  // If the portal root isn't found (or we're on the server) don't render the modal.
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && !isExiting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={handleAnimationComplete}
          className="fixed inset-0 bg-MODAL_BACKGROUND flex items-center justify-center z-[9999] p-4"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalRoot
  );
};

export default ModalPopup;
