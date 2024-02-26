import { db } from "@/drizzle/db";
import { images } from "@/drizzle/schema";
import { createId } from "@paralleldrive/cuid2";
import { NextRequest, NextResponse } from "next/server";

export const config = { runtime: "Edge" };

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const name: string | null = data.get("name") as string | null;

  if (!file || !name) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const date = new Date(+new Date() + 60000 * 0.5);

  await db.insert(images).values({
    id: createId(),
    file: buffer,
    name: name ?? "",
    isReady: date.getTime().toString(),
  });
  return NextResponse.json({ success: true }, { status: 201 });
}

const isReady = (date: string | null) => {
  if (!date) {
    return "processing";
  }

  const d = new Date(Number(date));
  const currentDate = Date.now();

  if (d.getTime() < currentDate) {
    return "ready";
  } else {
    return "processing";
  }
};

export async function GET(request: NextRequest) {
  const rows = await db.select().from(images).all();

  return NextResponse.json(
    rows.map((r) => ({ id: r.id, name: r.name, status: isReady(r.isReady) }))
  );
}
