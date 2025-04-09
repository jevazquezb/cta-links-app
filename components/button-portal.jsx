"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ButtonPortal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBilling = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-portal", {
        returnUrl: window.location.href,
      });

      const portalUrl = response.data.url;

      window.location.href = portalUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn bg-[#5DA2D5] hover:bg-[#5294c6] text-white"
      onClick={handleBilling}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Billing
    </button>
  );
};

export default ButtonPortal;
