import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';


const asciiLine = "-".repeat(27) // to make reading files nicer 
const terminalText = "> user@jasperchong-terminal:~$ ";

// lazy importing for speed
const LazyPairTrading = () => lazy(() => import("./text/pairtrading"));
const LazyBells = () => lazy(() => import("./text/bells"));


const files = { 'bells.txt': LazyBells, 'pairtrading.txt': LazyPairTrading }



// want to add extra commands like cv which can link to different pages
// test more comments

const responses = {
  "help": [
    "Available commands:",
    "1. help - Show this help message.",
    "2. clear - Clear the terminal.",
    "3. ls - List the contents of the current directory.",
    "4. read [filename] - Display the contents of the specified text file.",
    "5. echo [text] - Echo the text you provide.",
    "6. linkedin - Get my LinkedIn profile.",
    "7. github - Get my GitHub profile.",
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
  "github": [<a target="_blank" href="  https://github.com/jasperchongcode" className="link">github.com/jasperchongcode</a>],

  "eddy": [<img src="./public/ed.png" />]

};

function App() {


  // State to hold terminal output commands
  const [commands, setCommands] = useState([
    [`${terminalText}Welcome to the interactive terminal`, ""],
    ['Type a command and press Enter.', ""],
    ['Type "help" to see the available commands.', ""],
  ]);

  // useRef hook to access the input field and output for scrolling
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const cursorRef = useRef(null); // Create a ref for the cursor

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

  // Automatically scroll to the bottom of the terminal output when commands update
  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [commands]);

  // Effect to handle the input resizing
  useEffect(() => {
    resizeInput(); // Resize the input initially
  }, [currentInput]); // Re-run when currentInput changes

  useEffect(() => {
    const handleClick = () => {
      inputRef.current.focus(); // Focus the input field when the document is clicked
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick); // Clean up event listener on unmount
    };
  }, []); // Empty dependency array to run on mount and unmount

  return (
    <main className="p-6 h-screen flex flex-col justify-start">

      <div
        id="terminal-output"
        ref={outputRef}
        className="overflow-auto flex-grow mb-4"
      >
        <span className='flex items-center'>
          <pre>
            {`     ██╗ █████╗ ███████╗██████╗ ███████╗██████╗      ██████╗██╗  ██╗ ██████╗ ███╗   ██╗ ██████╗ 
     ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔═══██╗████╗  ██║██╔════╝ 
     ██║███████║███████╗██████╔╝█████╗  ██████╔╝    ██║     ███████║██║   ██║██╔██╗ ██║██║  ███╗
██   ██║██╔══██║╚════██║██╔═══╝ ██╔══╝  ██╔══██╗    ██║     ██╔══██║██║   ██║██║╚██╗██║██║   ██║
╚█████╔╝██║  ██║███████║██║     ███████╗██║  ██║    ╚██████╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝
 ╚════╝ ╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
                                                                                                `}
          </pre>
        </span>
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
        <p className="flex items-center">
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
            {/* Cursor that appears just after the input */}
            <span ref={cursorRef} className="cursor absolute"></span>
          </span>
        </p>

      </div>
    </main>
  );
}

export default App;
