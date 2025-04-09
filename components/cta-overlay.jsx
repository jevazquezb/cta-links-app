const CTAOverlay = ({ cta }) => {
  // className={`btn ${cta.style || "btn-primary"}`
  return (
    // <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 border border-gray-200">
    //   <p className="text-gray-800">{cta.message}</p>
    //   <a
    //     href={cta.buttonUrl}
    //     target="_blank"
    //     rel="noopener noreferrer"
    //     className="btn btn-primary"
    //   >
    //     {cta.buttonLabel}
    //   </a>
    // </div>

    <div className="absolute bottom-14 left-6 bg-white text-black p-4 rounded-lg space-y-1 text-center opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out shadow-lg">
      <p className="font-bold">{cta.message}</p>
      <a href={cta.buttonUrl} target="_blank" className="btn btn-primary">
        {cta.buttonLabel}
      </a>
    </div>
  );
};

export default CTAOverlay;
