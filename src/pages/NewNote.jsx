import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function NewNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please write a title and some content before saving.");
      return;
    }

    setSaving(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("notes").insert({
      title,
      content,
      user_id: user.id,
    });

    setSaving(false);

    if (error) {
      setError("Failed to save note. Try again.");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">New Note</h1>

        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

        <input
          type="text"
          placeholder="Note title"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          rows={10}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim() || saving}
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}