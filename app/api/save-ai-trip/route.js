/ /app/api/verify-user/route.js
import { db } from "@/service/firebaseConfig"; 
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { tripData, formData, EmailAddress,docId } = await req.json();

    try {
        // Generate a unique document ID
       

        // Create a document reference
        const docRef = doc(db, "AiTrips", docId);

        // Set the document in the Firestore database
        await setDoc(docRef, {
            userSelection: formData,
            tripData: tripData,
            UserEmail: EmailAddress,
            id: docId
        });

        // Return a success response
        return NextResponse.json({ result: "Data successfully stored!" });
    } catch (error) {
        console.error("Firebase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}