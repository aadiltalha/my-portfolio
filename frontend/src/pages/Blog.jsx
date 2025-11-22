import { useEffect, useState } from "react";
import { getBlogs } from "../utils/api";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchBlogs() {
      try {
        const res = await getBlogs();
        if (!active) return;
        setBlogs(res.data?.data || []);
      } catch (err) {
        console.error("Blogs fetch error:", err);
        if (!active) return;
        setError("Failed to load articles. Please try again later.");
      } finally {
        active && setLoading(false);
      }
    }

    fetchBlogs();

    // basic SEO improvement: set page title
    document.title = "Blog | Aadil Talha";

    return () => {
      active = false;
    };
  }, []);

  function getExcerpt(blog) {
    if (blog.excerpt) return blog.excerpt;
    if (!blog.content) return "";
    // strip HTML tags and trim
    const plain = blog.content.replace(/<[^>]+>/g, "").trim();
    if (plain.length <= 200) return plain;
    return plain.slice(0, 200) + "…";
  }

  function formatDate(dateString) {
    if (!dateString) return null;
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
      {/* Header */}
      <header className="mb-10 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Bl<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">ogs</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-cyan-400 rounded"></div>
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Thoughts, notes & build logs
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Short, practical posts about building with the MERN stack,
            performance tuning, and lessons learned from real projects.
          </p>
        </div>
      </header>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/70 p-5 animate-pulse"
            >
              <div className="h-36 w-full rounded-xl bg-muted mb-4" />
              <div className="space-y-2 mb-3">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/3 bg-muted rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted rounded" />
                <div className="h-3 w-5/6 bg-muted rounded" />
                <div className="h-3 w-2/3 bg-muted rounded" />
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
      {!loading && !error && blogs.length === 0 && (
        <div className="rounded-2xl border border-border/70 bg-card/70 px-5 py-6 text-sm text-muted-foreground">
          No articles published yet. Once you start writing about your projects,
          this page becomes a strong signal of your expertise.
        </div>
      )}

      {/* Blog list */}
      {!loading && !error && blogs.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => {
            const dateLabel = formatDate(b.createdAt || b.updatedAt);
            const excerpt = getExcerpt(b);

            return (
              <article
                key={b._id}
                className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/80 p-4 sm:p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/25"
              >
                {b.image && (
                  <Link
                    to={`/blog/${b._id}`}
                    className="block mb-4 overflow-hidden rounded-xl"
                  >
                    <img
                      src={b.image}
                      alt={b.title}
                      loading="lazy"
                      className="h-40 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </Link>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {dateLabel && (
                      <time
                        dateTime={b.createdAt || b.updatedAt}
                        className="text-[11px] text-muted-foreground"
                      >
                        {dateLabel}
                      </time>
                    )}
                    {b.tags && b.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {b.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-primary/20 bg-primary/5 px-2 py-[3px] text-[10px] font-medium text-primary"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link to={`/blog/${b._id}`} className="block">
                    <h2 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition">
                      {b.title}
                    </h2>
                  </Link>

                  {excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-4">
                      {excerpt}
                    </p>
                  )}

                  <div className="mt-auto pt-2">
                    <Link
                      to={`/blog/${b._id}`}
                      className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/90"
                    >
                      Read article
                      <span className="ml-1.5 text-[11px]">↗</span>
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
