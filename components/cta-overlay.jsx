"use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

const CTAOverlay = ({ cta }) => {
  // const [cta, setCta] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCTA = async () => {
  //     try {
  //       const response = await axios.get(`/api/links/${slug}`);
  //       setCta(response.data.cta);
  //     } catch (error) {
  //       console.error("Error fetching CTA:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCTA();
  // }, [slug]);

  // if (loading || !cta) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 border border-gray-200">
      <p className="text-gray-800">{cta.message}</p>
      <a href={cta.buttonUrl} target="_blank" rel="noopener noreferrer">
        <button className={`btn ${cta.style || "btn-primary"}`}>
          {cta.buttonLabel}
        </button>
      </a>
    </div>
  );
};

export default CTAOverlay;
