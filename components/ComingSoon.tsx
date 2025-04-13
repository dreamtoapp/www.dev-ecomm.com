"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function ComingSoon({ title = "قريبًا" }) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-evenly h-screen bg-gray-100 text-gray-800 p-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="mb-6 flex items-center justify-center w-32 h-32"
      >
        <Clock size={100} className="text-gray-600" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-3xl md:text-3xl font-extrabold mb-6 tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {title} {dots}
        </h1>
      </motion.div>
      <p className="text-lg md:text-2xl opacity-90 leading-relaxed">
        نحن نعمل على شيء رائع لكم. ترقبوا الجديد قريبًا!
      </p>
    </div>
  );
}
