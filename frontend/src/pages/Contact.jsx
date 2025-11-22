import { useState } from "react";
import { postContact } from "../utils/api";
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }

    // basic email check (not perfect, but better than nothing)
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return toast.error("Please enter a valid email address");
    }

    setLoading(true);
    try {
      const res = await postContact(form);
      if (res.data && res.data.success) {
        toast.success("Message sent successfully");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error(res.data?.message || "Failed to send message");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-4 py-16 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start">
        {/* LEFT: intro + contact info */}
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary tracking-wide">
            Let’s build something that actually ships
          </span>

          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Contact
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md">
              Have a project in mind, need a full-stack app, or want to upgrade
              an existing product? Share a few details and I’ll get back to you
              with a clear, technical response — no fluff.
            </p>
          </div>

          <div className="mt-4 space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                @
              </span>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-xs sm:text-sm">
                  You’ll usually get a reply within 24 hours.
                </p>
                <p className="mt-1 text-xs sm:text-sm font-mono">
                  aadiltalha12@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                ⌚
              </span>
              <div>
                <p className="font-medium text-foreground">Availability</p>
                <p className="text-xs sm:text-sm">
                  Open to new freelance projects & long-term collaborations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                🌍
              </span>
              <div>
                <p className="font-medium text-foreground">Based in</p>
                <p className="text-xs sm:text-sm">
                  India (IST) · Comfortable working across time zones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: form card */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-2xl opacity-70" />

          <div className="rounded-3xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-xl shadow-black/30 p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-semibold">
                Tell me about your project
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                A few lines are enough — I’ll ask more specific questions if
                needed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-0"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-0"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs sm:text-sm font-medium text-foreground"
                >
                  Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share what you want to build, your timeline, and any links or references."
                  className="w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none ring-offset-background transition resize-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-0"
                />
              </div>

              {/* Button + note */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 sm:px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  By sending this form you agree to be contacted about your
                  project. No spam, ever.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
