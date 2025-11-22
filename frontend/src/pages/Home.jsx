"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiMail,
  FiExternalLink,
  FiStar,
  FiCode,
  FiLayout,
  FiServer,
  FiTool,
} from "react-icons/fi";
import { getProjects, getTestimonials } from "../utils/api";

const skills = [
  {
    category: "Core Stack",
    icon: FiCode,
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js (App Router)",
      "Node.js",
      "Express.js",
    ],
  },
  {
    category: "Frontend & UI",
    icon: FiLayout,
    items: [
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
      "Responsive UI & UX",
      "Component-based architecture",
      "State management (Context, custom hooks)",
    ],
  },
  {
    category: "Backend & Data",
    icon: FiServer,
    items: [
      "MongoDB & Mongoose",
      "REST API design",
      "Authentication (JWT)",
      "File uploads (Cloudinary)",
      "Form handling & validation",
      "Error handling & logging",
    ],
  },
  {
    category: "Dev Tools & Workflow",
    icon: FiTool,
    items: [
      "Git & GitHub",
      "Vite & Next dev tooling",
      "Environment config (.env)",
      "Performance optimization",
      "API integration (3rd party)",
      "Deployments (Vercel, Render, etc.)",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function normalizeTechStack(stack) {
  if (!stack) return [];
  if (Array.isArray(stack)) return stack;
  return String(stack)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Full Stack MERN Developer | Aadil Talha";

    const meta = document.querySelector('meta[name="description"]');
    const description =
      "Aadil Talha – Full Stack MERN developer building performant, production-ready web apps, dashboards and landing pages.";
    if (meta) meta.setAttribute("content", description);

    getProjects()
      .then((res) => {
        const data = res.data?.data || [];
        setProjects(data.slice(-3).reverse());
      })
      .catch((err) => console.error("Error loading projects:", err))
      .finally(() => setLoadingProjects(false));

    getTestimonials()
      .then((res) => {
        const data = res.data?.data || [];
        setTestimonials(data.slice(-2).reverse());
      })
      .catch((err) => console.error("Error loading testimonials:", err))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  return (
    <main className="w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-screen blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8 inline-block">
              <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Available for projects
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              Crafting digital
              <br />
              <span className="bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                excellence
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
            >
              I&apos;m{" "}
              <strong className="text-primary font-semibold">
                Aadil Talha
              </strong>{" "}
              — a MERN-focused full stack developer building modern, performant,
              and production-ready web applications. From clean UI to reliable
              backend APIs, I take your idea from concept to deployment.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-muted-foreground mb-10 max-w-2xl"
            >
              You bring the idea. I architect, build, and ship a polished,
              maintainable product that you&apos;re not embarrassed to show
              clients, investors, or users.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 flex-wrap mb-16"
            >
              <Link to="/portfolio">
                <motion.button
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work <FiArrowRight size={18} />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Project
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-wide text-primary uppercase">
              Work
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              A curated selection of recent products I&apos;ve engineered —
              focused on performance, clarity, and real business value.
            </p>
          </motion.div>

          {loadingProjects ? (
            <p className="text-muted-foreground text-center">
              Loading projects...
            </p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No projects added yet. Once you publish them in the admin
              dashboard, they will appear here.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const techStack = normalizeTechStack(project.techStack);

                return (
                  <motion.article
                    key={project._id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    whileHover={{ y: -6 }}
                    className="group bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-primary/60 transition-all shadow-lg shadow-black/20 cursor-pointer"
                    onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    <div className="relative h-56 overflow-hidden bg-muted">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                          No image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3 gap-3">
                        <h3 className="text-lg font-semibold mb-1 text-foreground">
                          {project.title}
                        </h3>
                        {(project.liveLink || project.githubLink) && (
                          <a
                            href={project.liveLink || project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FiExternalLink className="text-sm" />
                          </a>
                        )}
                      </div>

                      {project.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      {techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {techStack.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] rounded-full border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/portfolio">
              <motion.button
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                View All Projects <FiArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        aria-labelledby="technical-expertise-heading"
        className="py-14 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 sm:mb-14"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium tracking-wide text-primary uppercase">
              Skills
            </span>

            <h2
              id="technical-expertise-heading"
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
            >
              Technical Expertise
            </h2>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              A practical stack refined through real-world MERN projects, admin
              dashboards, and production-ready applications. Focused on clean
              architecture, performance, and maintainable code.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((group, index) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="relative h-full rounded-2xl border border-border/60 bg-card/80 p-5 sm:p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/20"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {group.items.map((skill) => (
                      <li key={skill} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/70" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            What Clients Say
          </motion.h2>

          {loadingTestimonials ? (
            <p className="text-muted-foreground">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Once you&apos;ve completed a few projects, client feedback will
              appear here to build trust and credibility.
            </p>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 gap-8 text-left">
              {testimonials.map((t) => (
                <motion.article
                  key={t._id}
                  className="p-7 rounded-2xl border border-border/60 bg-card/80 hover:border-primary/60 transition shadow-lg shadow-black/20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base italic text-muted-foreground mb-5">
                    &quot;{t.message}&quot;
                  </p>
                  <div className="border-t border-border/60 pt-4">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.position || t.designation || "Client"}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Ready to build something real?
          </motion.h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-10">
            Whether it&apos;s a landing page, dashboard, or full-stack product,
            I can help you design, build, and ship it with clean code and solid
            architecture.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <motion.button
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.05 }}
              >
                Start a Project <FiArrowRight size={18} />
              </motion.button>
            </Link>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aadiltalha12@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FiMail size={18} /> Send an Email
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
}
