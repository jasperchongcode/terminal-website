import { ImageResponse } from '@vercel/og';
// import App from "../src/App"

export default async function handler() {
    return new ImageResponse(
        (
            <>
                <div>
                    Hello world
                </div>
            </>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}