"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ButtonLogout from "@/components/button-logout";
import FormCTA from "@/components/form-cta";
import ButtonCheckout from "@/components/button-checkout";
import ButtonDeleteLink from "@/components/button-delete-link";
import ButtonCopyLink from "@/components/button-copy-link";
import ButtonEditLink from "@/components/button-edit-link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCTA, setEditingCTA] = useState(null); // State for editing CTA

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user data from an API route
    fetchUser();
  }, []);

  const handleCreate = () => {
    setEditingCTA(null);
    document.getElementById("my_modal_2").showModal();
  };

  const handleNewCTA = (newLink) => {
    setUser((prev) => ({
      ...prev,
      links: [...prev.links, newLink],
    }));

    document.getElementById("my_modal_2").close();
  };

  const linkStr = (slug) =>
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://zappyvid.com"
    }/link/${slug}`;

  const handleDelete = (linkId) => {
    setUser((prev) => ({
      ...prev,
      links: prev.links.filter((link) => link._id !== linkId),
    }));
  };

  const handleUpdateCTA = (updatedLink) => {
    setUser((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link._id === updatedLink._id ? updatedLink : link
      ),
    }));
    setEditingCTA(null);
    document.getElementById("my_modal_2").close();
  };

  const handleEdit = (link) => {
    setEditingCTA({ ...link });
    document.getElementById("my_modal_2").showModal();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECECEC] text-gray-800">
      <header className="bg-white shadow-md">
        <div className="flex justify-between items-center p-6 max-w-5xl mx-auto">
          <ButtonCheckout />
          <ButtonLogout />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {user?.links?.length ?? 0} CTA link
            {user?.links?.length !== 1 ? "s" : ""}
          </h2>
          <button
            className="btn bg-[#5DA2D5] hover:bg-[#5294c6] text-white"
            onClick={handleCreate}
          >
            Add a CTA
          </button>
        </div>

        {!user?.links?.length ? (
          <p className="text-center text-gray-500">There are no CTAs.</p>
        ) : (
          <table className="w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-[#5DA2D5] text-white">
              <tr>
                <th className="text-left px-4 py-2">CTA Link</th>
                <th className="text-center px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {user?.links?.map((link) => (
                <tr key={link._id} className="border-t border-gray-200">
                  <td className="px-4 py-2 w-[76%] max-w-0 truncate">
                    {linkStr(link.slug)}
                  </td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <ButtonCopyLink linkStr={linkStr(link.slug)} />
                    <ButtonEditLink onClick={() => handleEdit(link)} />
                    <ButtonDeleteLink
                      linkId={`${link._id}`}
                      onDelete={() => handleDelete(link._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <FormCTA
            onSubmit={handleNewCTA}
            onUpdate={handleUpdateCTA}
            initialData={editingCTA}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
