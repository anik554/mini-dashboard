"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { SlDocs } from "react-icons/sl";

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function Card({ title, children, className = "" }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -4 }}
      className={`bg-white shadow-md rounded-lg p-4 ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2">
          {title === "Total Users" ? (
            <FaUsers size={30} color="oklch(45.3% 0.124 130.933)" />
          ) : title === "Total Posts" ? (
            <SlDocs size={30} color="oklch(47.6% 0.114 61.907)" />
          ) : (
            ""
          )}
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        </div>
      )}
      <div>{children}</div>
    </motion.div>
  );
}