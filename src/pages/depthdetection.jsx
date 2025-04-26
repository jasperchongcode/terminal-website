
import { squat_detection } from "../assets"

const DepthDetection = () => {
    return (
        <>
            <div className="py-2  gap-8 flex flex-col">
                <h1 className="font-bold text-base md:text-lg">Using computer vision for detecting squat depth</h1>


                <p>
                    I had this really cool project recommended to me on linkedin which prompted me to learn some more computer vision!
                </p>
                <p>
                    I gave myself 3 hours and no Gen AI (to ensure i was learning) to build a project to solve a real issue I face, never knowing when I'm hitting depth on squats!
                    To fix this issue that could be corrected with 10 minutes of practice I spent just under 3 hours creating a camera based system for detecting and sending audio cues when proper depth is reached, and for counting reps.
                </p>
                <p>Below is a photo of the "skeleton" detection in action, and a full demo video can be seen on my linkedin (type <span className="terminal-highlight">linkedin</span>)</p>

                <div id="diagram" className="">
                    <label> Screenshot of demo video with full "skeleton", estimated leg angle, and estimated leg tolerance.
                        <img className="image" src={squat_detection} alt='Screenshot of demo video with full "skeleton", estimated leg angle, and estimated leg tolerance.' />
                    </label>
                </div>
                <p>
                    A demo of this can be seen below, and the code is avaliable on my github (type <span className="terminal-highlight">github</span>)!
                    I would love to hear peoples thoughts on this, and I hope I get people thinking about making some computer vision projects of their own! (the free opencv bootcamp was a great starting point for me)

                </p>
                <p><span className="terminal-highlight">OpenCV</span> was used for general image processing, and <span className="terminal-highlight">MediaPipe</span> specifically for pose recognition.</p>

                <h1>Features:</h1>
                <ul class="list-disc list-inside space-y-2">
                    <li>Relevant "joints" go green when the model is confident (configurable threshold).</li>
                    <li>Display of leg joint confidence.</li>
                    <li>Configurable threshold for required height difference to detect a rep.</li>
                    <li>Display of angle behind the leg.</li>
                    <li>FPS display (performance indicator).</li>
                    <li>Rep counter with overcounting prevention.</li>
                </ul>

                <p>This setup could be extended to other exercises or movements in the future with minimal additional development.</p>

            </div>
        </>
    );
}

export default DepthDetection;
