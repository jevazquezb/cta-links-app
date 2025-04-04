// // import { useRouter } from "next/router";
// // import { useEffect, useState } from "react";

export default function VideoCTA() {
  // const router = useRouter();
  // const { slug } = router.query;
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   if (slug) {
  //     fetch(`/api/links/${slug}`)
  //       .then((res) => res.json())
  //       .then(setData);
  //   }
  // }, [slug]);

  // if (!data) return <p>Loading...</p>;

  const getYouTubeVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.substring(1);
      } else if (urlObj.hostname.includes("youtube.com")) {
        return urlObj.searchParams.get("v");
      }
    } catch (error) {
      console.error("Invalid URL", error);
    }
    return null;
  };

  const data = {
    cta: {
      text: "Aquí va un texto",
      url: "https://cursoreact.dev/",
    },
  };

  const url = "https://youtu.be/I13tqbF4P2I?si=poH_UJ-MutuMmR_E";

  return (
    <div className="relative w-full h-screen bg-black">
      <iframe
        // width="560"
        // height="315"
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
          url
        )}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {/* <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
        frameBorder="0"
        allowFullScreen
      ></iframe> */}

      <div className="absolute bottom-14 left-6 bg-white text-black p-4 rounded-lg">
        <p className="font-bold text-lg">{data.cta.text}</p>
        <a href={data.cta.url} target="_blank" className="btn btn-primary">
          Take Action
        </a>
      </div>
    </div>
  );
}
