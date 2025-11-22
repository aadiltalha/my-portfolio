import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/projects/${id}` // ✅ FIXED — no localhost fallback
        );

        setProject(res.data?.data || null);

        if (!res.data?.data) {
          setError("Project not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-muted-foreground">
          Loading project…
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-red-400">
          {error || "Project not found"}
        </div>
      </section>
    );
  }

  const techStack = Array.isArray(project.techStack)
    ? project.techStack
    : typeof project.techStack === "string"
    ? project.techStack.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <section className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-2xl mb-8 shadow-lg shadow-black/40 object-cover max-h-[420px]"
            loading="lazy"
          />
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {project.title}
        </h1>

        {project.description && (
          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
            {project.description}
          </p>
        )}

        {techStack.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-6">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
            >
              View Live
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white/5 text-sm font-semibold hover:bg-white/10 transition border border-white/10"
            >
              View Code on GitHub
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
