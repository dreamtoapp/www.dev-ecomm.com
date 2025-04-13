import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const Notification = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
      >
        <span className="text-sm font-medium">تمت الإضافة!</span>
        <Check size={16} className="text-green-600 dark:text-green-400" />
      </motion.div>
    )}
  </AnimatePresence>
);

export default Notification;
