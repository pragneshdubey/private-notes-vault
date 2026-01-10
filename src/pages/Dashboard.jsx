import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setNotes(data);
    }

    setLoading(false);
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (!error) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } else {
      alert("Failed to delete note.");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading notes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold">Private Notes</h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/new")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium"
          >
            + New Note
          </button>

          <button
            onClick={logout}
            className="text-sm text-slate-400 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-slate-400">
          No notes yet. Your vault is empty.
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <h2 className="font-medium mb-1">{note.title}</h2>

                  <p className="text-sm text-slate-400 line-clamp-2">
                    {note.content}
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4 text-sm">
                  <button
                    onClick={() => navigate(`/edit/${note.id}`)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}