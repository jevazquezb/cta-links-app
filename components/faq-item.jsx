const FAQItem = ({ qa }) => {
  return (
    <li className="bg-[#ECECEC] rounded-md">
      <details className="group transition-[content-visibility] duration-300">
        <summary className="flex justify-between p-4 text-lg font-bold cursor-pointer">
          <span>{qa.question}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 hidden group-open:block"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 group-open:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </summary>
        <p className="mt-2 px-4">{qa.answer}</p>
      </details>
    </li>
  );
};

export default FAQItem;
