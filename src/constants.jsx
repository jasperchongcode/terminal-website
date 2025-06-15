import { labradoodle, devan_eleven } from "./assets"
import { lazy } from "react";

//probably add 0.1.0 for a blog/page/big command, 0.0.1 for a noticeable chaneg, 1.0.0 for a major overhaul
const version = "2.2.0"
export const asciiLine = <hr className='line' /> // to make reading files nicer 
export const terminalText = "> user@jasperchong-terminal:~$ "; // constant used at the start of each line

// lazy importing for speed
const lazyImport = (path) => lazy(() => import(`./pages/${path}.jsx`));

const LazyPairTrading = lazyImport("pairtrading");
const LazyLitClock = lazyImport("litclock");
const LazyAbout = lazyImport("about");
const LazySummerResearch = lazyImport("summerresearch");
const LazyDepthDetection = lazyImport("depthdetection");
const LazyDiffuserDrawing =lazyImport("diffuserdrawing");


// files and a lazy loader promise for rendering
// may be worth adding folders and things eventually as i write more
export const files = {
  'about.txt': LazyAbout,
  'pairtrading.txt': LazyPairTrading,
  'litclock.txt': LazyLitClock,
  'summerresearch.txt': LazySummerResearch,
  'aidepthdetection.txt': LazyDepthDetection,
  'diffuserdrawing.txt': LazyDiffuserDrawing,
}


// Used to toggle between colour themes
export const themes = {
  default: "default-theme",

  amber: "amber-theme",
  black: "black-theme",
  blue: "blue-theme",
  commodore: "commodore-theme",
  cyberpunk: "cyberpunk-theme",
  dracula: "dracula-theme",
  dos: "dos-theme",
  gruvbox: "gruvbox-theme",
  monokai: "monokai-theme",
  nord: "nord-theme",
  "one-dark": "one-dark-theme",
  palenight: "palenight-theme",
  purple: "purple-theme",
  red: "red-theme",
  "solarized-dark": "solarized-dark-theme",
  "solarized-light": "solarized-light-theme",
  solaris: "solaris-theme",
  white: "white-theme",
};
// to display welcome message 
export const currentDateTime = new Date().toLocaleString([], {
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

// Default starting display when opening the site (use custom size so it fits on mobile screens well)
export const defaultCommands = [
  [<span key="name" className='flex flex-col md:flex-row pt-3'>
    <pre className='text-[0.625rem]/[0.75rem] md:text-base'>
      {`     ██╗ █████╗ ███████╗██████╗ ███████╗██████╗     
     ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗    
     ██║███████║███████╗██████╔╝█████╗  ██████╔╝    
██   ██║██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗    
╚█████╔╝██║  ██║███████║██║     ███████╗██║  ██║    
 ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝    
                                                    `}
    </pre>
    <span className='flex flex-row'>
      <pre className='text-[0.625rem]/[0.75rem] md:text-base'>
        {` ██████╗██╗  ██╗ ██████╗ ███╗   ██╗ ██████╗ 
██╔════╝██║  ██║██╔═══██╗████╗  ██║██╔════╝ 
██║     ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║   ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
                                            `}
      </pre>
      <pre className='text-[0.625rem]/[0.75rem] md:text-base typing-text font-bold'>{`
      
      
      
      
v${version}`}</pre>
    </span>
  </span>],
  [`${terminalText}Welcome to the JC terminal`, ""],
  [<p key="start-time">{`Session start time: ${currentDateTime}`}</p>],
  ['Type a command and press Enter.', ""],
  [<div key="help-message" className="font-bold">Type <span className='terminal-highlight'>&quot;help&quot;</span> to see the available commands.</div>, ""],
];

export const hiddenResponses = {
  "1️⃣1️⃣": [<img key="eleven" className="image" src={devan_eleven} alt="Very attractive man" border="0" />],
  "eleven": [<img key="eleven" className="image" src={devan_eleven} alt="Very attractive man" border="0" />],
    "labradoodle": [<img key="labradoodle" className="image" src={labradoodle} alt="Two labradoodles on a car" border="0" />],
    "akiflow": [<a key="akiflowReferral" target="_blank" href="https://web.akiflow.com/referral?name=SmFzcGVy&referral=7qCFeRNE9olhCymwEjz3iv81NsXiYU" className="link">akiflow.com/referral</a>]
}