import React, { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2, X, Check, BookOpen, Eye } from "lucide-react";
import getAllPoemsHook from "../../hooks/poems/getAllPoemsHook";
import useAdminPoemActionsHook from "../../hooks/poems/useAdminPoemActionsHook";
import { formatDate } from "../../utils/date-format";
import UploadPoems from "./UploadPoems";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 9;

const SkeletonCard = () => (
    <div className="bg-white/60 rounded-2xl p-5 animate-pulse">
        <div className="w-6 h-1 bg-gray-200 rounded mb-3" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
        <div className="space-y-1.5">
            <div className="h-3 bg-gray-100 rounded" />
            <div className="h-3 bg-gray-100 rounded w-4/5" />
        </div>
    </div>
);

const PreviewModal = ({ poem, onClose, onEdit }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <span className="text-xs font-medium text-purple-500 uppercase tracking-widest">Preview</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onEdit}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition"
                    >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-7">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mb-5" />
                <h2 className="text-3xl font-serif text-gray-800 leading-snug mb-2">{poem.title}</h2>
                <p className="text-sm font-medium text-purple-500 mb-8">By {poem.author}</p>
                <p className="text-gray-700 text-base leading-loose whitespace-pre-line font-serif">
                    {poem.body}
                </p>
                <p className="text-xs text-gray-400 mt-8 pt-5 border-t border-gray-100">
                    Published {formatDate(poem.createdAt)}
                </p>
            </div>
        </div>
    </div>
);

const EditModal = ({ poem, onClose, onSave, isSaving }) => {
    const [form, setForm] = useState({ title: poem.title, body: poem.body });

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-lg font-serif font-semibold text-gray-800">Edit Poem</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                        <textarea
                            value={form.body}
                            onChange={(e) => setForm({ ...form, body: e.target.value })}
                            rows={8}
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition resize-none font-serif"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 px-6 pb-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 disabled:opacity-60 transition"
                    >
                        <Check className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal = ({ poem, onClose, onConfirm, isDeleting }) => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mx-auto mb-4">
                <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-center font-semibold text-gray-800 mb-1">Delete Poem</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-700">"{poem.title}"</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-60 transition"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [previewingPoem, setPreviewingPoem] = useState(null);
    const [editingPoem, setEditingPoem] = useState(null);
    const [deletingPoem, setDeletingPoem] = useState(null);

    const { poems, totalPages, isLoading, fetchAllPoems } = getAllPoemsHook();
    const { isLoading: isActing, handleUpdate, handleDelete } = useAdminPoemActionsHook();

    const loadPoems = () =>
        fetchAllPoems({
            pageSize: ITEMS_PER_PAGE,
            offsetValue: (page - 1) * ITEMS_PER_PAGE,
            search,
        });

    useEffect(() => {
        loadPoems();
    }, [page, search]);

    const handleSaveEdit = async (formData) => {
        try {
            await handleUpdate(editingPoem._id, formData);
            toast.success("Poem updated successfully!");
            setEditingPoem(null);
            loadPoems();
        } catch {
            toast.error("Failed to update poem.");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await handleDelete(deletingPoem._id);
            toast.success("Poem deleted.");
            setDeletingPoem(null);
            if (poems.length === 1 && page > 1) setPage((p) => p - 1);
            else loadPoems();
        } catch {
            toast.error("Failed to delete poem.");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-serif font-semibold text-gray-800">Poems</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage your uploaded poems</p>
                </div>
                <button
                    onClick={() => setUploadOpen(true)}
                    className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" /> New Poem
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl px-5 py-3 shadow-sm mb-6 max-w-sm">
                <Search className="w-4 h-4 text-purple-400 shrink-0" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search poems..."
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                />
                {search && (
                    <button onClick={() => { setSearch(""); setPage(1); }} className="text-gray-400 hover:text-gray-600 text-xs transition">
                        Clear
                    </button>
                )}
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : poems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <BookOpen className="w-12 h-12 text-purple-200 mb-4" />
                    <p className="text-gray-500 font-medium">No poems found</p>
                    {search && <p className="text-gray-400 text-sm mt-1">Try a different search term.</p>}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {poems.map((poem) => (
                        <div
                            key={poem._id}
                            className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col"
                        >
                            <div className="w-6 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mb-3" />
                            <h2 className="text-base font-serif font-semibold text-gray-800 mb-1 line-clamp-2 leading-snug">
                                {poem.title}
                            </h2>
                            <p className="text-xs text-purple-500 font-medium mb-3">{poem.author}</p>
                            <p className="text-gray-500 text-xs flex-1 leading-relaxed line-clamp-3">
                                {poem.body}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-400">{formatDate(poem.createdAt)}</p>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setPreviewingPoem(poem)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition"
                                        title="Preview"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setEditingPoem(poem)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition"
                                        title="Edit"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setDeletingPoem(poem)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-8">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-9 h-9 rounded-xl text-sm font-medium transition ${
                                page === i + 1
                                    ? "bg-purple-500 text-white shadow-sm"
                                    : "bg-white/60 text-gray-600 hover:bg-purple-50"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {uploadOpen && (
                <UploadPoems
                    onClose={() => setUploadOpen(false)}
                    onSuccess={loadPoems}
                />
            )}

            {/* Preview Modal */}
            {previewingPoem && (
                <PreviewModal
                    poem={previewingPoem}
                    onClose={() => setPreviewingPoem(null)}
                    onEdit={() => { setEditingPoem(previewingPoem); setPreviewingPoem(null); }}
                />
            )}

            {/* Modals */}
            {editingPoem && (
                <EditModal
                    poem={editingPoem}
                    onClose={() => setEditingPoem(null)}
                    onSave={handleSaveEdit}
                    isSaving={isActing}
                />
            )}
            {deletingPoem && (
                <DeleteConfirmModal
                    poem={deletingPoem}
                    onClose={() => setDeletingPoem(null)}
                    onConfirm={handleConfirmDelete}
                    isDeleting={isActing}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
