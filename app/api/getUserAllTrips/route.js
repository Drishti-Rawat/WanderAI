import { db } from "@/service/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
    // Get email from URL params
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
        // Query trips collection
        const tripsRef = collection(db, "AiTrips");
        const q = query(tripsRef, where("UserEmail", "==", email));
        const querySnapshot = await getDocs(q);

        // Format results
        const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ trips });
    } catch (error) {
        console.error("Firebase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}