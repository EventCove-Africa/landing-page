/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { openNewTabWithUrl } from "@/utils";
import { URLS } from "@/constants";

export default function MobileMenu({ router, navLinks }: any) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Use event.target and ensure it’s outside the menuRef
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    // Add the event listener when the menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount or when the menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Depend on isMenuOpen to trigger this only when the menu opens

  return (
    <>
      {/* Mobile Menu Icon */}
      <button onClick={toggleMenu} className="md:hidden block">
        {isMenuOpen ? (
          <IoClose className="w-[32px] h-[32px]" />
        ) : (
          <IoMenuSharp className="w-[32px] h-[32px]" />
        )}
      </button>
      {/* Mobile Menu */}

      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            ref={menuRef} // Make sure the ref is attached to the div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white shadow-lg p-5 md:hidden flex flex-col gap-4 z-50"
          >
            {navLinks.map((record: any) => (
              <button
                key={record?.id}
                onClick={() => {
                  if (record?.action) {
                    record?.action();
                  } else {
                    router.push(`/#${record?.id}`);
                  }
                  closeMenu();
                }}
                className="text-base text-start font-medium text-grey_100 hover:text-primary_100 transition-colors border-b border-grey_100 pb-4"
                aria-label={record?.label}
              >
                {record?.label}
              </button>
            ))}
            <div className="w-full flex gap-2 items-center mt-4">
              <button
                type="button"
                className="w-full px-4 py-3 text-sm font-medium text-primary_100 border border-primary_100 rounded-xl transition-colors"
                onClick={() => {
                  openNewTabWithUrl(`${URLS.webAllURL}/#/auth/login`);
                  closeMenu();
                }}
                aria-label="Login"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full px-4 py-3 text-sm font-medium text-white bg-primary_100 rounded-xl transition-colors"
                onClick={() => {
                  openNewTabWithUrl(`${URLS.webAllURL}/#/auth/signup`);
                  closeMenu();
                }}
                aria-label="Sign Up"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
