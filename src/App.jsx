import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';


const asciiLine = "-".repeat(27) // to make reading files nicer 
const terminalText = "> user@jasperchong-terminal:~$ "; // constant used at the start of each line

// lazy importing for speed
const LazyPairTrading = () => lazy(() => import("./text/pairtrading"));
const LazyLorem = () => lazy(() => import("./text/lorem"));
const LazyLitClock = () => lazy(() => import("./text/litclock"));
const LazyAbout = () => lazy(() => import("./text/about"));


// files and a lazy loader promise for rendering
// may be worth adding folders and things eventually as i write more
const files = { 'about.txt': LazyAbout, 'lorem.txt': LazyLorem, 'pairtrading.txt': LazyPairTrading, 'litclock.txt': LazyLitClock }


// want to add extra commands like cv which can link to different pages
// test more comments

const responses = {
  "help": [asciiLine,
    "Available commands:",
    "1. help - Show this help message.",
    "2. clear - Clear the terminal.",
    "3. ls - List the contents of the current directory.",
    "4. read [filename] - Display the contents of the specified text file.",
    "5. linkedin - Get my LinkedIn profile.",
    "6. github - Get my GitHub profile.",
    "7. email - Get my email for any queries (please note this is forwarded to my main account).",
    "8. website - Get my website (you're already here though!).",
    "9. echo [text] - Echo the text you provide.",
    asciiLine,
    <div>I recommend using the <span className='terminal-highlight'>"ls"</span> command to view the available files in the current directory.</div>,
    <div>You can then use the <span className='terminal-highlight'>"read [filename]"</span> command to read any of those files.</div>,
    "Commands are not case-sensitive, and you don't need to type the file extensions.",
    "I hope you enjoy the site :)",
    asciiLine
  ],
  "clear": "Terminal cleared.",
  "echo": (args) => args.join(' '), // Return the echoed text
  "ls": () => Object.keys(files), // List files in the home directory
  "read": (args) => {
    const filename = args[0]; // Get the filename from arguments
    if (files[filename]) {
      const LazyComponent = files[filename]()
      return [<>
        <div>{asciiLine}</div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
        <div>{asciiLine}</div>
      </>]; // Return the contents if file exists
    }
    else if (files[filename + ".txt"]) {
      const LazyComponent = files[filename + ".txt"]();
      return [<>
        <div>{asciiLine}</div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
        <div>{asciiLine}</div>
      </>]; // Return the contents if file exists
    }
    else {
      return [<div className='error'>File not found: {filename}</div>]; // Handle file not found
    }
  },
  "linkedin": [<a target="_blank" href="https://www.linkedin.com/in/jasper-chong-062932276/?originalSubdomain=au" className="link">linkedin.com/jasperchong</a>],
  "github": [<a target="_blank" href="https://github.com/jasperchongcode" className="link">github.com/jasperchongcode</a>],
  "email": [<a href="mailto: contact@jasperchong.com" className="link">contact@jasperchong.com</a>],
  "website": [<a href="https://jasperchong.com" className="link">jasperchong.com</a>],
  "eddy": [<img className="border-[#4AF626] border-4" src="https://i.ibb.co/6tMBMCT/eddy.jpg" alt="attractive man" border="0" />],
  "labradoodle": [<img className="border-[#4AF626] border-4" src="https://i.ibb.co/BB87xxD/labradoodle.jpg" alt="Two labradoodles on a car" border="0" />],
};

function App() {
  // State to hold terminal output commands
  const [commands, setCommands] = useState([
    [<span className='flex flex-col md:flex-row pt-3'>
      <pre>
        {`     ██╗ █████╗ ███████╗██████╗ ███████╗██████╗     
     ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗    
     ██║███████║███████╗██████╔╝█████╗  ██████╔╝    
██   ██║██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗    
╚█████╔╝██║  ██║███████║██║     ███████╗██║  ██║    
 ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝    
                                                    `}
      </pre>
      <pre>
        {` ██████╗██╗  ██╗ ██████╗ ███╗   ██╗ ██████╗ 
██╔════╝██║  ██║██╔═══██╗████╗  ██║██╔════╝ 
██║     ███████║██║   ██║██╔██╗ ██║██║  ███╗
██║     ██╔══██║██║   ██║██║╚██╗██║██║   ██║
╚██████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
 ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
                                            `}
      </pre>
    </span>],
    [`${terminalText}Welcome to the JC terminal`, ""],
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
  };

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
    <main className="px-6 py-0 h-screen flex flex-col justify-start">

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
                setCurrentInput(e.target.value);
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
        {/* This is so you can click in the empty space below the input and auto focus on the input */}
        <div id="empty-space" className="flex-grow" onClick={handleClick} />

      </div>
    </main>
  );
}

export default App;