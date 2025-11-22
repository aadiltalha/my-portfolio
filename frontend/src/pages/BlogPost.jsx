// frontend/src/pages/BlogPost.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../utils/api"; // use centralized axios instance

export default function BlogPost() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        // Use api helper which has correct baseURL (VITE_API_URL)
        const res = await api.get(`/blogs/${id}`);
        if (res?.data?.success) {
          setBlog(res.data.data);
        } else {
          setErrorMsg(res?.data?.message || "Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setErrorMsg(err?.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto p-6">
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="max-w-4xl mx-auto p-6 text-center">
        <p>{errorMsg}</p>
        <Link to="/blog" className="text-blue-400 underline">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="max-w-4xl mx-auto p-6 text-center">
        <p>Blog not found.</p>
        <Link to="/blog" className="text-blue-400 underline">
          ← Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <motion.section
      className="max-w-4xl mx-auto p-6 prose prose-invert"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to="/blog" className="text-blue-400 underline text-sm mb-4 inline-block">
        ← Back to Blog
      </Link>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center justify-between mb-6 text-sm text-gray-400">
        <p>By {blog.author || "Anonymous"}</p>
        <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Render HTML if present, otherwise plain text */}
      <div className="blog-content text-base leading-relaxed">
        {typeof blog.content === "string" && blog.content.includes("<") ? (
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        ) : (
          <p>{blog.content}</p>
        )}
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {blog.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded bg-accent/10 border border-accent/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.section>
  );
}
