import React, { useRef, useState, useEffect } from 'react';
import { bells } from "./blogs/bells";

const files = { 'bells.txt': bells, 'blog1.txt': ["hello"] }

const asciiLine = "-".repeat(27)

// want to add extra commands like cv which can link to different pages

const responses = {
  "help": [
    "Available commands:",
    "1. help - Show this help message.",
    "2. clear - Clear the terminal.",
    "3. ls - List the contents of the current directory.",
    "4. read [filename] - Display the contents of the specified text file.",
    "5. echo [text] - Echo the text you provide."
  ],
  "clear": "Terminal cleared.",
  "echo": (args) => args.join(' '), // Return the echoed text
  "ls": () => Object.keys(files), // List files in the home directory
  "read": (args) => {
    const filename = args[0]; // Get the filename from arguments
    if (files[filename]) {
      return [asciiLine, ...files[filename], asciiLine]; // Return the contents if file exists
    }
    else if (files[filename + ".txt"]) {
      return [asciiLine, ...files[filename + ".txt"], asciiLine]; // Return the contents if file exists
    }
    else {
      return [`File not found: ${filename}`]; // Handle file not found
    }
  },
};

function App() {
  const terminalText = "> user@terminal-website:~$ ";

  // State to hold terminal output commands
  const [commands, setCommands] = useState([
    ['> user@terminal-website:~$ Welcome to the interactive terminal', ""],
    ['Type a command and press Enter.', ""],
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

        if (command == "clear") {
          setCommands([])
        }

        else if (responses[command]) {
          const response = typeof responses[command] === 'function'
            ? responses[command](args) // Call function if it's a dynamic response
            : responses[command]; // Get static response

          console.log(response)

          // If the response is an array, add each line separately
          if (Array.isArray(response)) {
            console.log('response is array')
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
            ["Command not found: ", userCommand]
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
