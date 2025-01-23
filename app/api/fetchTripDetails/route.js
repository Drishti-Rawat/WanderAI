// /app/api/get-trip/route.js
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { docId } = await req.json();

    if (!docId) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    // Create a reference to the document
    const docRef = doc(db, "AiTrips", docId);

    // Get the document
    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if (docSnap.exists()) {
      // Return the document data
      return NextResponse.json({
        success: true,
        data: docSnap.data(),
      });
    } else {
      // Document not found
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching trip:", error);
    return NextResponse.json(
      { error: "Failed to fetch trip data" },
      { status: 500 }
    );
  }
}
