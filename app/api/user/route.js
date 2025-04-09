import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/lib/mongoose";
import User from "@/models/user";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user?.id).populate("links");

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
