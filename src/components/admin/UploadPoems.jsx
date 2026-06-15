import React, { useState } from "react";
import { X, Feather } from "lucide-react";
import CreatePoemHook from "./hooks/CreatePoemHook";
import toast from "react-hot-toast";

const UploadPoems = ({ onClose, onSuccess }) => {
    const { isLoading, createPoem } = CreatePoemHook();
    const [poem, setPoem] = useState({ title: "", body: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPoem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPoem({ title: poem.title, body: poem.body });
            toast.success("Poem published successfully!");
            onSuccess?.();
            onClose?.();
        } catch {
            toast.error("Failed to publish poem.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-1.5 bg-purple-50 rounded-lg">
                            <Feather className="w-4 h-4 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-serif font-semibold text-gray-800">New Poem</h3>
                            <p className="text-xs text-gray-400">Add a new poem to the collection</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={poem.title}
                                onChange={handleChange}
                                placeholder="Enter poem title..."
                                required
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Poem
                            </label>
                            <textarea
                                name="body"
                                value={poem.body}
                                onChange={handleChange}
                                placeholder="Write your poem here..."
                                rows={10}
                                required
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition resize-none font-serif leading-relaxed"
                            />
                            <p className="text-xs text-gray-400 mt-1">{poem.body.length} characters</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-medium py-2.5 rounded-xl text-sm transition disabled:opacity-60"
                        >
                            <Feather className="w-4 h-4" />
                            {isLoading ? "Publishing..." : "Publish Poem"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPoems;
