import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/lib/mongoose";
import User from "@/models/user";
import Link from "@/models/link";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const body = await req.json();

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

    await connectMongo();

    const user = await User.findById(session.user?.id);

    if (!user.isPro && user.links?.length > 2) {
      return NextResponse.json(
        { error: "Please subscribe first." },
        { status: 403 }
      );
    }

    const link = await Link.create({
      userId: user._id,
      videoUrl: body.videoUrl,
      slug: nanoid(),
      cta: {
        message: body.message,
        buttonLabel: body.buttonLabel,
        buttonUrl: body.buttonUrl,
      },
    });

    user.links.push(link._id);
    await user.save();

    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const linkId = searchParams.get("linkId");

    if (!linkId) {
      return NextResponse.json(
        { error: "linkId is required." },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    const user = await User.findById(session.user?.id);

    if (!user.isPro) {
      return NextResponse.json(
        { error: "Please subscribe first." },
        { status: 403 }
      );
    }

    await Link.deleteOne({
      _id: linkId,
      userId: session.user?.id,
    });

    // links is an array of linkId's
    user.links = user.links.filter((id) => `${id}` !== linkId);
    await user.save();

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    // Parse the request body
    const { linkId, formData } = await req.json();

    if (!linkId) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { videoUrl, message, buttonLabel, buttonUrl } = formData;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "YouTube URL is required." },
        { status: 400 }
      );
    }

    if (!buttonUrl) {
      return NextResponse.json(
        { error: "A URL for the button is required." },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    const user = await User.findById(session.user?.id);

    if (!user.isPro) {
      return NextResponse.json(
        { error: "Please subscribe first." },
        { status: 403 }
      );
    }

    // Connect to the database
    await connectMongo();

    // Find and update the CTA
    const updatedCTA = await Link.findByIdAndUpdate(
      linkId,
      { videoUrl, cta: { message, buttonLabel, buttonUrl } },
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
