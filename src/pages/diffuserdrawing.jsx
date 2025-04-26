
import { top_hat_dogs, painted_dragon } from "../assets"

const DiffuserDrawing = () => {
    return (
        <>
            <div className="py-2 gap-8 flex flex-col">
                <h1 className="font-bold text-base md:text-lg">Using Diffusers to Improve Basic Art</h1>

                <p>
                    Quite a few years ago now I saw a demo of Nvidida's Canvas tool and that totally blew my mind at the time. When I started working through huggingface's free diffuser course I realised it would be possible for me to create a project loosely inspired by this idea.
                </p>
                <p>Building on my recent interest in learning digital painting, my idea was to take an existing photo, be able to anotate it with an microsoft paint style artwork, and then use AI to generate a good looking drawing!</p>
                <p>Through lots of (maybe not very efficient!) research and experimentation I'm proud to present my solution! It was a very enjoyable experience, and it felt amazing to "discover" a method I hadn't heard before through experimentation to drastically improve the quality of the generated results (discussed more in the github but just upscaling during inpainting).</p>
                <div id="diagram" className="">
                    <label> Display of 4 step process for generating my dogs with top hats (should of used a more impressive example but trust me it's really cool 😆)
                        <img className="image" src={top_hat_dogs} alt='Display of 4 step process for generating my dogs with top hats' />
                    </label>
                </div>
                <p>An additional benefit of having the drawing is it allows you to "seed" the diffusers generation process, and get across more complex things like direction you would like a dragon to face, or where you would like spikes and exactly how large on the dragon.</p>
                <div id="diagram" className="">
                    <label> Slightly cooler dragon example! Showing how the drawing is used to "seed" the generation. (Couldn't get this to work without the upscaling trick!)
                        <img className="image" src={painted_dragon} alt='Slightly cooler dragon example! Showing how the drawing is used to "seed" the generation' />
                    </label>
                </div>

                <p>The main features are:
                    <ul class="list-disc list-inside space-y-2">
                        <li>A basic Microsoft Paint style drawing tool:
                            <ul class="list-disc list-inside ml-6 space-y-1">
                                <li>Auto saves a mask with customizable padding</li>
                                <li>Change brush colour</li>
                                <li>Change brush size</li>
                                <li>Change brush opacity</li>
                                <li>Eraser mode</li>
                                <li>Brush cursor</li>
                            </ul>
                        </li>
                        <li>Function to generate an image with stable diffusion inpainting</li>
                        <li>Function to generate an image with controlnet-enhanced inpainting</li>
                        <li>Function to display these images with optional labeling</li>
                    </ul>


                </p>

                <p>
                    More in depth details at my <span className="terminal-highlight">github</span> under diffuser-painting!
                </p>

            </div>

        </>
    );
}

export default DiffuserDrawing;
