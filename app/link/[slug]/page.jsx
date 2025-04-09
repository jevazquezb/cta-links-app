import connectMongo from "@/lib/mongoose";
import Link from "@/models/link";
import { redirect } from "next/navigation";
import CTAOverlay from "@/components/cta-overlay";

const getCTA = async (slug) => {
  await connectMongo();

  const link = await Link.findOne({ slug });

  if (!link) {
    redirect("/");
  }

  return link;
};

export default async function VideoCTA({ params }) {
  const { slug } = params;
  const link = await getCTA(slug);

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

  return (
    <div className="relative w-full h-screen bg-black">
      <iframe
        // width="560"
        // height="315"
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(
          link.videoUrl
        )}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <CTAOverlay cta={link.cta} />
    </div>
  );
}
