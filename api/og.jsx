import { ImageResponse } from '@vercel/og';
import App from "../src/App"

export default async function handler() {
    return new ImageResponse(
        (
            <>
                <App />
            </>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}