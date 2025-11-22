"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center max-w-md">
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-4xl font-bold mb-4">Lost in Code</h2>
          <p className="text-secondary text-lg">
            The page you're looking for doesn't exist. But don't worry, there are plenty of other places to explore.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <Link to="/">
            <motion.button
              className="px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft size={20} />
              Back Home
            </motion.button>
          </Link>
          <Link to="/portfolio">
            <motion.button
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Portfolio
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-cyan-400/5 blur-3xl"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </main>
  )
}
