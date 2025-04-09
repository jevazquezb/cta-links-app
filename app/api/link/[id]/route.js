import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/lib/mongoose";
import Link from "@/models/link";

export async function GET(req) {
  try {
    // const slug = req.nextUrl.pathname.split("/").pop();
    // if (!slug) {
    //   return NextResponse.json(
    //     { error: "A link ID is required." },
    //     { status: 400 }
    //   );
    // }
    // await connectMongo();
    // let link = await Link.findOne({ slug });
    // if (!link) {
    //   return NextResponse.json({ error: "Link not found." }, { status: 404 });
    // }
    // return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Parse the request body
    const body = await req.json();

    // Extract the ID from the URL
    const { id } = req.nextUrl.pathname.split("/").pop();
    console.log("ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { videoUrl, message, buttonLabel, buttonUrl } = body;

    if (!body.videoUrl) {
      return NextResponse.json(
        { error: "YouTube URL is required." },
        { status: 400 }
      );
    }

    if (!body.buttonUrl) {
      return NextResponse.json(
        { error: "A URL for the button is required." },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    // Connect to the database
    await connectMongo();

    // Find and update the CTA
    const updatedCTA = await Link.findByIdAndUpdate(
      id,
      { videoUrl, message, buttonLabel, buttonUrl },
      { new: true } // Return the updated document
    );

    if (!updatedCTA) {
      return NextResponse.json({ error: "CTA not found" }, { status: 404 });
    }

    // Respond with the updated CTA
    // return new Response(JSON.stringify(updatedCTA), { status: 200 });
    return NextResponse.json(updatedCTA);
  } catch (error) {
    console.error("Error updating CTA:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
