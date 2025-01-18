// /app/api/verify-user/route.js
import { db } from "@/service/firebaseConfig"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { user } = await req.json();

    try {
        // Create a reference to the user document using email as ID
        const userRef = doc(db, "users", user.primaryEmailAddress.emailAddress);
        
        // Check if user exists
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            // Create new user document if it doesn't exist
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl,
                createdAt: new Date().toISOString()
            };
            
            await setDoc(userRef, userData);
            return NextResponse.json({ result: userData });
        }
        
        // Return existing user data
        return NextResponse.json({ result: userDoc.data() });
        
    } catch (error) {
        console.error("Firebase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}