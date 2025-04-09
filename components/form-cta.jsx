"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function FormCTA({ onSubmit, onUpdate, initialData = null }) {
  const [formData, setFormData] = useState({
    videoUrl: "",
    message: "",
    buttonLabel: "",
    buttonUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        videoUrl: initialData.videoUrl || "",
        message: initialData.cta.message || "",
        buttonLabel: initialData.cta.buttonLabel || "",
        buttonUrl: initialData.cta.buttonUrl || "",
      });
    } else {
      setFormData({
        videoUrl: "",
        message: "",
        buttonLabel: "",
        buttonUrl: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.videoUrl) newErrors.videoUrl = "Video URL is required.";
    if (!formData.buttonUrl) newErrors.buttonUrl = "Button URL is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (initialData) {
        // Update existing CTA
        const response = await axios.put("/api/link", {
          linkId: initialData._id,
          formData,
        });
        onUpdate(response.data);
        toast.success("CTA updated!");
      } else {
        // Create new CTA
        const response = await axios.post("/api/link", formData);
        onSubmit(response.data);
        toast.success("CTA created!");
      }

      setFormData({
        videoUrl: "",
        message: "",
        buttonLabel: "",
        buttonUrl: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
      <label className="form-control">
        <div className="label">
          <span className="label-text">YouTube Video URL</span>
        </div>
        <input
          type="text"
          placeholder="Add a YouTube URL"
          className="input input-bordered"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
        />
        {errors.videoUrl && (
          <p className="text-red-500 text-sm">{errors.videoUrl}</p>
        )}
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">CTA Message</span>
        </div>
        <input
          type="text"
          placeholder="Add a message for your CTA"
          className="input input-bordered"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Button Label</span>
        </div>
        <input
          type="text"
          placeholder="Add a label to your button"
          className="input input-bordered"
          name="buttonLabel"
          value={formData.buttonLabel}
          onChange={handleChange}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Button URL</span>
        </div>
        <input
          type="text"
          placeholder="Add a YouTube URL"
          className="input input-bordered"
          name="buttonUrl"
          value={formData.buttonUrl}
          onChange={handleChange}
        />
        {errors.buttonUrl && (
          <p className="text-red-500 text-sm">{errors.buttonUrl}</p>
        )}
      </label>
      <button
        type="submit"
        className="btn bg-[#5DA2D5] hover:bg-[#4a8ac0] text-white self-end"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        {initialData ? "Update CTA" : "Create CTA"}
      </button>
    </form>
  );
}
