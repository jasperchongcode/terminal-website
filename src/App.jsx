import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Spinner } from './components';
import { eddy, labradoodle } from "./assets"

//probably add 0.1.0 for a blog/page/big command, 0.0.1 for a noticeable chaneg, 1.0.0 for a major overhaul
const version = "1.2.1"
const asciiLine = <hr className='border-terminal-green my-2' />//"-".repeat(27) // to make reading files nicer 
const terminalText = "> user@jasperchong-terminal:~$ "; // constant used at the start of each line

// lazy importing for speed
const LazyPairTrading = () => lazy(() => import("./pages/pairtrading"));
const LazyLorem = () => lazy(() => import("./pages/lorem"));
const LazyLitClock = () => lazy(() => import("./pages/litclock"));
const LazyAbout = () => lazy(() => import("./pages/about"));
const LazySummerResearch = () => lazy(() => import("./pages/summerresearch"));



// files and a lazy loader promise for rendering
// may be worth adding folders and things eventually as i write more
const files = {
  'about.txt': LazyAbout,
  'lorem.txt': LazyLorem,
  'pairtrading.txt': LazyPairTrading,
  'litclock.txt': LazyLitClock,
  'summerresearch.txt': LazySummerResearch,
}

// to display welcome message 
const currentDateTime = new Date().toLocaleString([], {
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

// want to add extra commands like cv which can link to different pages
// test more comments

const responses = {
  "help": [asciiLine,
    "Available commands:",
    "1. help - Show this help message.",
    "2. clear - Fully clear terminal.",
    "3. r - Reload page to initial view.",
    "4. ls - List the contents of the current directory.",
    "5. read [filename] - Display the contents of the specified text file.",
    "6. linkedin - Get my LinkedIn profile.",
    "7. github - Get my GitHub profile.",
    "8. email - Get my email for any queries (please note this is forwarded to my main account).",
    "9. website - Get my website (you're already here though!).",
    "10. echo [text] - Echo the text you provide.",
    asciiLine,
    <div>I recommend using the <span className='terminal-highlight'>"ls"</span> command to view the available files in the current directory.</div>,
    <div>You can then use the <span className='terminal-highlight'>"read [filename]"</span> command to read any of those files.</div>,
    "Commands are not case-sensitive, and you don't need to type the file extensions.",
    "I hope you enjoy the site :)",
    asciiLine
  ],
  "clear": "Terminal cleared.",
  "r": "Terminal reloaded.",
  "echo": (args) => args.join(' '), // Return the echoed text
  "ls": () => Object.keys(files), // List files in the home directory
  "read": (args) => {
    const filename = args[0]; // Get the filename from arguments
    if (files[filename]) {
      const LazyComponent = files[filename]()
      return [<>
        <div>{asciiLine}</div>
        <Suspense fallback={<span><Spinner /> Loading...</span>}>
          <LazyComponent />
        </Suspense>
        <div>{asciiLine}</div>
      </>]; // Return the contents if file exists
    }
    else if (files[filename + ".txt"]) {
      const LazyComponent = files[filename + ".txt"]();
      return [<>
        <div>{asciiLine}</div>
        <Suspense fallback={<span><Spinner /> Loading...</span>}>
          <LazyComponent />
        </Suspense>
        <div>{asciiLine}</div>
      </>]; // Return the contents if file exists
    }
    else {
      return [<div className='error'>File not found: {filename}</div>]; // Handle file not found
    }
  },
  "linkedin": [<a target="_blank" href="https://www.linkedin.com/in/jasper-chong-012345678910111213/" className="link">linkedin.com/jasperchong</a>],
  "github": [<a target="_blank" href="https://github.com/jasperchongcode" className="link">github.com/jasperchongcode</a>],
  "email": [<a href="mailto: contact@jasperchong.com" className="link">contact@jasperchong.com</a>],
  "website": [<a href="https://jasperchong.com" className="link">jasperchong.com</a>],
  "spotify": [<a target="_blank" href="https://open.spotify.com/user/7mqmetexug75muj9bosr7cd40?si=0f1f1ecfd5e84b4f&nd=1&dlsi=c73852fab98749db" className="link">spotify.com/jasperchong</a>],
  "eddy": [<img className="image" src={eddy} alt="attractive man" border="0" />],
  "labradoodle": [<img className="image" src={labradoodle} alt="Two labradoodles on a car" border="0" />],
};

function App() {


  // State to hold terminal output commands
  const [commands, setCommands] = useState([
    [<span className='flex flex-col md:flex-row pt-3'>
      <pre className='text-sm md:text-base'>
        {`     ██╗ █████╗ ███████╗██████╗ ███████╗██████╗     
     ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗    
     ██║███████║███████╗██████╔╝█████╗  ██████╔╝    
██   ██║██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗    
╚█████╔╝██║  ██║███████║██║     ███████╗██║  ██║    
 ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝    
                                                    `}
      </pre>
      <span className='flex flex-row'>
        <pre className='text-sm md:text-base'>
          {` ██████╗██╗  ██╗ ██████╗ ███╗   ██╗ ██████╗ 
██╔════╝██║  ██║██╔═══██╗████╗  ██║██╔════╝ 
██║     ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║   ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
                                            `}
        </pre>
        <pre className='text-sm md:text-base typing-text font-bold'>{`
      
      
      
      
v${version}`}</pre>
      </span>
    </span>],
    [`${terminalText}Welcome to the JC terminal`, ""],
    [<p>{`Session start time: ${currentDateTime}`}</p>],
    ['Type a command and press Enter.', ""],
    [<div className="font-bold">Type <span className='terminal-highlight'>"help"</span> to see the available commands.</div>, ""],
  ]);

  const inputRef = useRef(null);  // useRef hook to access the input field for resizing 
  const outputRef = useRef(null); // for auto scroll 
  const cursorRef = useRef(null); // Create a ref for the cursor for resizing

  // State to hold the current user input value
  const [currentInput, setCurrentInput] = useState('');

  // Function to resize the input and cursor position
  const resizeInput = () => {
    const input = inputRef.current;
    const cursor = cursorRef.current;

    if (input && cursor) {
      input.style.width = `${input.value.length + 1}ch`; // Add 1 for padding
      cursor.style.left = `${input.value.length}ch`; // Cursor to the right of the text
    }
  };

  // Function to handle the Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setRecommendations(prev => [])

      const userCommand = currentInput.trim(); // Get the input text

      if (userCommand !== "") {
        // Add the new command to the terminal output
        setCommands(prevCommands => [
          ...prevCommands,
          [terminalText, userCommand],
        ]);

        // Check for response based on the command
        const commandParts = userCommand.split(' ');
        const command = commandParts[0];
        const args = commandParts.slice(1); // Get any arguments

        if (command.toLowerCase() == "clear") {
          setCommands([])
        }

        else if (command.toLowerCase() == "r") {
          location.reload()
        }

        else if (responses[command.toLowerCase()]) {
          const response = typeof responses[command.toLowerCase()] === 'function'
            ? responses[command.toLowerCase()](args) // Call function if it's a dynamic response
            : responses[command.toLowerCase()]; // Get static response

          // If the response is an array, add each line separately
          if (Array.isArray(response)) {
            setCommands(prevCommands => [
              ...prevCommands,
              ...response.map(line => [line, ""]), // Wrap each line in an array
            ]);
          } else {
            // For non-array responses, just add it directly
            setCommands(prevCommands => [
              ...prevCommands,
              [response]
            ]);
          }
        } else {
          // Handle unknown command
          setCommands(prevCommands => [
            ...prevCommands,
            [<span className="error">Command not found: </span>, userCommand]
          ]);
        }

        // Clear the input field for the next command
        setCurrentInput('');
      }
    }

    else if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior (moving focus)

      const inputParts = currentInput.trim().split(" ");
      if (inputParts.length === 1 && currentInput.trim()) {
        // Autocomplete commands
        const matches = Object.keys(responses).filter(cmd => cmd.startsWith(inputParts[0].toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(matches[0]); // Autofill if only one match
        } else if (matches.length > 1) {
          setRecommendations(prev => matches)

        }
      }
      else if (inputParts.length === 2 && currentInput.trim()) {
        // Autocomplete filenames
        const matches = Object.keys(files).filter(file => file.startsWith(inputParts[1].toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(`${inputParts[0]} ${matches[0]}`);
        } else if (matches.length > 1) {
          setRecommendations(prev => matches)
        }
      }
    }
  };

  const [recommendations, setRecommendations] = useState([])

  // Auto scroll to bottom when commands updated
  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [commands]);

  // Effect to handle the input resizing
  useEffect(() => {
    resizeInput(); // Resize the input initially
  }, [currentInput]); // Re-run when currentInput changes

  const handleClick = (event) => {

    inputRef.current.focus(); // Focus the input field when the document is clicked
  };


  return (
    <main className="px-6 py-2 h-screen flex flex-col justify-start">
      <div
        id="terminal-output"
        ref={outputRef}
        className="overflow-auto flex-grow mb-4 flex flex-col"
      >

        {commands.map((command, index) => (
          <p key={index}>
            {
              (command.length == 2) ? (
                <span>{command[0]} <span className='typing-text'>{command[1]}</span></span>
              ) : (
                <span>{command}</span>
              )
            }
          </p>
        ))}

        {/* Input Field as part of the terminal */}
        <p id="input-wrapper" className="flex items-center" onClick={handleClick}>
          <span className="mr-2">{terminalText}</span>
          <span className="relative">
            <input
              id="command-input"
              type="text"
              className="typing-input bg-transparent outline-none typing-text w-auto min-w-[1rem] flex-grow caret-transparent"
              value={currentInput}
              onChange={(e) => {
                console.log("setting current input to", e.target.value)
                setCurrentInput(prev => e.target.value);
                resizeInput(); // Resize input on change
              }}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              autoFocus
            />
            {/* Cursor */}
            <span ref={cursorRef} className="cursor absolute"></span>
          </span>
        </p>
        <p id="recommendations" className='grid grid-cols-1'>
          {recommendations.map((recommendation, id) => <div id="id">{recommendation}</div>)}
        </p>
        {/* This is so you can click in the empty space below the input and auto focus on the input */}
        <div id="empty-space" className="flex-grow" onClick={handleClick} />

      </div>
    </main>
  );
}

export default App;