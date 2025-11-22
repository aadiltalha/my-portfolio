import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../utils/api";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProjects() {
      try {
        const res = await getProjects();
        if (!active) return;
        setProjects(res.data?.data || []);
      } catch (err) {
        if (!active) return;
        console.error("Projects fetch error:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        active && setLoading(false);
      }
    }

    fetchProjects();

    // basic SEO improvement
    document.title = "Projects | Aadil Talha";

    return () => {
      active = false;
    };
  }, []);

  function normalizeTechStack(stack) {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;
    // if backend sends comma-separated string
    return String(stack)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
      {/* Header */}
      <header className="mb-10 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Portf<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">olio</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-cyan-400 rounded"></div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Selected projects
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            A selection of full-stack and frontend projects built with the MERN
            stack, focused on performance, clean UI, and real-world usability.
          </p>
        </div>
      </header>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/70 p-5 animate-pulse"
            >
              <div className="h-40 w-full rounded-xl bg-muted mb-4" />
              <div className="space-y-2 mb-3">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="h-5 w-16 bg-muted rounded-full" />
                <div className="h-5 w-20 bg-muted rounded-full" />
                <div className="h-5 w-14 bg-muted rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && projects.length === 0 && (
        <div className="rounded-2xl border border-border/70 bg-card/70 px-5 py-6 text-sm text-muted-foreground">
          No projects added yet. Once you publish a few apps here, this page
          will become one of the strongest proofs of your skills.
        </div>
      )}

      {/* Projects grid */}
      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => {
            const techStack = normalizeTechStack(p.techStack);

            return (
              <article
                key={p._id}
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/25"
              >
                {/* Thumbnail */}
                {p.image && (
                  <Link
                    to={`/projects/${p._id}`}
                    className="block mb-4 overflow-hidden rounded-xl"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </Link>
                )}

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <Link to={`/projects/${p._id}`} className="block">
                    <h2 className="text-base sm:text-lg font-semibold mb-1 group-hover:text-primary transition">
                      {p.title}
                    </h2>
                  </Link>

                  {p.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                      {p.description}
                    </p>
                  )}

                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-primary/20 bg-primary/5 px-2 py-[3px] text-[11px] font-medium text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-auto pt-2 flex flex-wrap gap-2">
                    {p.liveLink && (
                      <a
                        href={p.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
                      >
                        View live
                        <span className="ml-1.5 text-[11px]">↗</span>
                      </a>
                    )}
                    {p.githubLink && (
                      <a
                        href={p.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/90 shadow-sm transition hover:border-primary/40 hover:text-primary"
                      >
                        GitHub
                      </a>
                    )}
                    <Link
                      to={`/projects/${p._id}`}
                      className="inline-flex items-center text-[11px] font-medium text-muted-foreground hover:text-primary ml-auto"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
