"use client"

import { motion } from "framer-motion"
import { FiCode, FiDatabase, FiServer } from "react-icons/fi"

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "RESTful APIs"],
    other: ["Python", "Oracle Database", "Docker", "Git", "AWS"],
  }

  const technologies = [
    { category: "Frontend", icon: FiCode, color: "from-blue-400 to-cyan-400", skills: skills.frontend },
    { category: "Backend", icon: FiServer, color: "from-purple-400 to-pink-400", skills: skills.backend },
    { category: "Tools & Other", icon: FiDatabase, color: "from-orange-400 to-red-400", skills: skills.other },
  ]

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Me</span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-cyan-400 rounded"></div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                I'm a full-stack developer with a passion for building scalable, performant web applications. My journey
                in tech started with a curiosity about how things work, and it evolved into a career crafting beautiful
                digital experiences.
              </p>
              <p className="text-lg text-secondary leading-relaxed mb-6">
                I specialize in the MERN stack and am Oracle Certified, bringing enterprise-level expertise to every
                project. I thrive on solving complex problems and collaborating with teams to create solutions that
                matter.
              </p>
              <p className="text-lg text-secondary leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source, or enjoying
                a good coffee while pondering the next big idea.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-accent p-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold">5+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Years Experience</p>
                    <p className="text-secondary text-sm">In full-stack development</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold">30+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Projects</p>
                    <p className="text-secondary text-sm">Successfully delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold">∞</span>
                  </div>
                  <div>
                    <p className="font-semibold">Passion</p>
                    <p className="text-secondary text-sm">For learning & growth</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Tech Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologies.map((tech, index) => {
                const Icon = tech.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-2xl bg-accent hover:bg-accent-light transition-colors border border-accent-light"
                  >
                    <div className={`flex items-center gap-4 mb-6`}>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${tech.color}`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold">{tech.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {tech.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="px-4 py-2 bg-background rounded-full text-sm font-medium text-primary border border-primary/30 hover:border-primary transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  role: "Senior Full Stack Developer",
                  company: "Self-Employed",
                  period: "2023 - Present",
                  description:
                    "Leading development of scalable MERN applications, architecting solutions for enterprise clients.",
                },
                {
                  role: "Full Stack Developer",
                  company: "ScaleUp Solutions Pvt Ltd - New Delhi, India",
                  period: "2021 - 2023",
                  description: "Built responsive web applications using React and Node.js, managed databases and APIs.",
                },
                {
                  role: "Junior Developer",
                  company: "ASLC Tech - JH, India",
                  period: "2019 - 2021",
                  description:
                    "Developed frontend components and backend APIs, participated in code reviews and technical discussions.",
                },
              ].map((exp, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 8 }}
                  className="p-6 rounded-xl bg-accent border-l-4 border-primary hover:bg-accent-light transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-primary text-sm font-medium">{exp.company}</p>
                    </div>
                    <span className="text-secondary text-sm">{exp.period}</span>
                  </div>
                  <p className="text-secondary">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
