import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { destination } = req.body;

  try {
    const genAI = new GoogleGenerativeAI("AIhsabjasbjfbjab");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const prompt = `Generate a beautiful travel photograph of ${destination}. Make it look realistic and scenic, suitable for a travel website.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const image = response.text();

    res.status(200).json({ imageUrl: image });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ message: 'Error generating image' });
  }
}