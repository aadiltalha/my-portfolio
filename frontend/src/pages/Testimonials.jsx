import { useEffect, useState } from "react";
import { getTestimonials } from "../utils/api";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchTestimonials() {
      try {
        const res = await getTestimonials();
        if (!active) return;
        setItems(res.data?.data || []);
      } catch (err) {
        if (!active) return;
        console.error("Testimonials fetch error:", err);
        setError("Failed to load testimonials. Please try again later.");
      } finally {
        active && setLoading(false);
      }
    }

    fetchTestimonials();
    return () => {
      active = false;
    };
  }, []);

  const averageRating =
    items.length > 0
      ? (
        items.reduce((sum, t) => sum + (t.rating || 0), 0) / items.length
      ).toFixed(1)
      : null;

  function renderStars(rating = 0) {
    const full = Math.round(rating);
    return (
      <div className="flex gap-0.5 text-xs text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < full ? "★" : "☆"}</span>
        ))}
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 lg:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Testimo<span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">nial</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-cyan-400 rounded"></div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              What clients say
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
              Honest feedback from people I’ve worked with — focused on
              communication, code quality, and on-time delivery.
            </p>
          </div>
        </div>

        {averageRating && (
          <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3 shadow-lg shadow-black/20">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Average rating
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{averageRating}</span>
                {renderStars(Number(averageRating))}
              </div>
            </div>
            <span className="h-8 w-px bg-border/60 hidden sm:block" />
            <span className="text-xs text-muted-foreground">
              Based on {items.length} testimonial{items.length !== 1 && "s"}
            </span>
          </div>
        )}
      </div>

      {/* States */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/60 p-5 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-24 bg-muted rounded" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
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

      {error && !loading && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border border-border/70 bg-card/70 px-5 py-6 text-sm text-muted-foreground">
          No testimonials yet. Once you complete a few projects, this section
          will become one of the strongest trust signals on your site.
        </div>
      )}

      {/* Testimonials grid */}
      {!loading && !error && items.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <article
              key={t._id}
              className="group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card/80 p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/20"
            >
              {/* subtle gradient glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

              <div className="flex items-center gap-3 mb-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-border/70"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-xs font-semibold text-primary">
                    {t.name?.[0]?.toUpperCase() || "?"}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      {t.role || t.position || t.company ? (
                        <p className="text-[11px] text-muted-foreground">
                          {[t.position || t.role, t.company]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    {t.rating ? (
                      <div className="flex flex-col items-end">
                        {renderStars(t.rating)}
                        <span className="text-[11px] text-muted-foreground">
                          {t.rating.toFixed ? t.rating.toFixed(1) : t.rating}/5
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-5">
                “{t.message}”
              </p>

              {t.project && (
                <div className="mt-3 pt-3 border-t border-border/60 text-[11px] text-muted-foreground">
                  Project:&nbsp;
                  <span className="font-medium text-foreground">
                    {t.project}
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
