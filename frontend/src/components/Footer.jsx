"use client"

import { motion } from "framer-motion"
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi"

export default function Footer() {
  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/aadiltalha", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/aadil-talha-378a411a8", label: "LinkedIn" },
    { icon: FiMail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=aadiltalha12@gmail.com", label: "Email" },
  ]

  return (
    <footer className="bg-background border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight">
              Aadil T<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">alha</span>
            </h4>

            <p className="text-secondary text-sm">
              Full-stack JavaScript developer specializing in MERN applications, clean UI design, and fast, scalable digital products.            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-secondary text-sm">
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:text-primary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 hover:bg-primary hover:text-background transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-accent/10 text-center text-secondary text-sm">
          <p>&copy; 2025 Aadil Talha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
