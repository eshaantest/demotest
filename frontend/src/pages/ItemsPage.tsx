import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus, Trash2, Edit2, CheckCircle, Circle } from "lucide-react";
import api from "../utils/api";

interface Item {
  id: number;
  title: string;
  description?: string;
  is_published: boolean;
  owner_id: number;
}

export default function ItemsPage() {
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { data: items = [], isLoading } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => api.get("/items/").then((r) => r.data),
  });

  const create = useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      api.post("/items/", payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      setTitle("");
      setDesc("");
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => api.delete(`/items/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });

  const toggle = useMutation({
    mutationFn: ({ id, is_published }: { id: number; is_published: boolean }) =>
      api.patch(`/items/${id}`, { is_published }).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });

  const handleCreate = () => {
    if (!title.trim()) return;
    create.mutate({ title, description: desc });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Items</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your demo items</p>
      </div>

      {/* Create form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">New Item</h2>
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          onClick={handleCreate}
          disabled={create.isPending || !title.trim()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          {create.isPending ? "Creating..." : "Create Item"}
        </button>
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {isLoading && <p className="text-sm text-gray-400">Loading...</p>}
        {!isLoading && items.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No items yet. Create one above.</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggle.mutate({ id: item.id, is_published: !item.is_published })}
                className="mt-0.5 text-gray-400 hover:text-indigo-500 transition-colors"
              >
                {item.is_published ? <CheckCircle size={18} className="text-emerald-500" /> : <Circle size={18} />}
              </button>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${
                  item.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {item.is_published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-indigo-500 transition-colors">
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => remove.mutate(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
