import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { writeFile, mkdir } from "node:fs/promises";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import path from "path";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { prompt, title } = data; // Add `title` to the request body

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN
    });

    const input = {
        prompt: prompt,
        output_format: 'png',
        output_quality: 80,
        aspect_ratio: '1:1'
    };

    try {
        const output: any = await replicate.run("black-forest-labs/flux-schnell", { input });

        // Check if the output is a ReadableStream
        if (output && output[0] instanceof ReadableStream) {
            // Convert the ReadableStream to a Buffer
            const reader = output[0].getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
            }

            // Combine the chunks into a single Buffer
            const buffer = Buffer.concat(chunks);

            // Ensure the `images` folder exists
            const imagesFolder = path.join(process.cwd(), "public", "images");
            await mkdir(imagesFolder, { recursive: true });

            // Generate a unique filename for the image
            const uniqueCode = uuidv4(); // Generate a unique ID
            const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "_"); // Sanitize the title for use in filenames
            const imageFilename = `${sanitizedTitle}_${uniqueCode}.png`; // Combine title and unique code
            const imagePath = path.join(imagesFolder, imageFilename); // Full path to the image
            console.log("image Path:",imagePath)
            // Save the image to the file system
            await writeFile(imagePath, buffer);

            // Return the filename and URL to access the saved image
            const imageUrl = `/images/${imageFilename}`; // Public URL to the image
            return NextResponse.json({ imageUrl, imageFilename });
        } else {
            return NextResponse.json({ error: "Unexpected response format from Replicate API" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error generating image:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}