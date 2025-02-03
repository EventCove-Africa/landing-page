import Layout from "@/layouts";
import { AnimatePresence, motion } from "framer-motion";
import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Layout>
        <Toaster />
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route} // Use the route as a unique key to trigger animation on route change
            initial={{ opacity: 0, x: 50 }} // Initial state (page enters from the right)
            animate={{ opacity: 1, x: 0 }} // Animate to visible state
            exit={{ opacity: 0, x: -50 }} // Exit animation (page slides to the left)
            transition={{ duration: 0.5 }} // Transition duration
            style={{ position: "relative" }} // Positioning might be needed depending on your layout
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}
