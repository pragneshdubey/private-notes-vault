import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setTitle(data.title);
      setContent(data.content);
    } else {
      alert("Note not found");
      navigate("/dashboard");
    }

    setLoading(false);
  };

  const updateNote = async () => {
    if (!title.trim() || !content.trim()) return;

    const { error } = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", id);

    if (!error) {
      navigate("/dashboard");
    } else {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center">
        Loading note...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-xl font-semibold">Edit Note</h1>

        <input
          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full h-48 bg-slate-900 border border-slate-800 rounded-lg p-3 outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            onClick={updateNote}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-lg font-medium"
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}