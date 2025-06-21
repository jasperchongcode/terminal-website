import { useRef, useState, useEffect, Suspense } from "react";
import { Spinner } from "./components";
import {
  asciiLine,
  terminalText,
  themes,
  defaultCommands,
  hiddenResponses,
  files,
} from "./constants";

function App() {
  // If the cursor is blinking
  const [isBlinking, setIsBlinking] = useState(true);
  // State to hold terminal output commands
  const [commands, setCommands] = useState(defaultCommands);

  const inputRef = useRef(null); // useRef hook to access the input field for resizing
  const outputRef = useRef(null); // for auto scroll
  const cursorRef = useRef(null); // Create a ref for the cursor for resizing

  // State to hold the current user input value
  const [currentInput, setCurrentInput] = useState("");
  // Store the "recommendations" when using tab autofill
  const [recommendations, setRecommendations] = useState([]);
  // Current theme
  const [currentTheme, setCurrentTheme] = useState(themes["default"]);
  // Sets whether the crt filter effect is enabled
  const [isCRTOn, setIsCRTOn] = useState(true);

  // The avaliable commands (must be defined in here as it changes state variables)
  const responses = {
    help: [
      asciiLine,
      "Available commands:",
      "1. help - Show this help message.",
      "2. clear - Fully clear terminal.",
      "3. r - Reset page to initial view.",
      "4. ls - List the contents of the current directory.",
      "5. read [filename] - Display the contents of the specified text file.",
      "6. linkedin - Get my LinkedIn profile.",
      "7. github - Get my GitHub profile.",
      "8. email - Get my email for any queries (please note this is forwarded to my main account).",
      "9. website - Get my website (you're already here though!).",
      "10. echo [text] - Echo the text you provide.",
      "11. theme [list/new-theme] - use 'theme list' to list avaliable themes, and 'theme [new-theme]' to switch.",
      "12. crt - toggle the CRT effect (on by default).",
      asciiLine,
      <div key="recommend">
        I recommend using the{" "}
        <span className="terminal-highlight">&quot;ls&quot;</span> command to
        view the available files in the current directory.
      </div>,
      <div key="read">
        You can then use the{" "}
        <span className="terminal-highlight">&quot;read [filename]&quot;</span>{" "}
        command to read any of those files.
      </div>,
      "Commands are not case-sensitive, and you don't need to type the file extensions (tab autofill is avaliable also!).",
      "I hope you enjoy the site :)",
      asciiLine,
    ],
    clear: (args) => {
      // take in any args to display as text
      setCommands([]);
      return [
        <span key="1" className="terminal-highlight">
          {args.join(" ")}
        </span>,
      ];
    },
    r: (args) => {
      // can take in args to act like a hidden echo after reset
      setCommands(defaultCommands);
      return [
        <span key="1" className="terminal-highlight">
          {args.join(" ")}
        </span>,
      ];
    },
    echo: (args) => args.join(" "), // Return the echoed text
    ls: () => Object.keys(files), // List files in the home directory
    read: (args) => {
      const filename = args[0]; // Get the filename from arguments

      if (!filename) {
        // if its null return
        return [
          <div key="error" className="error">
            Invalid argument: null
          </div>,
        ];
      }

      if (files[filename.toLowerCase()]) {
        const LazyComponent = files[filename.toLowerCase()];
        return [
          <>
            <div>{asciiLine}</div>
            <Suspense
              fallback={
                <span>
                  <Spinner /> Loading...
                </span>
              }
            >
              <LazyComponent />
            </Suspense>
            <div>{asciiLine}</div>
          </>,
        ]; // Return the contents if file exists
      } else if (files[filename.toLowerCase() + ".txt"]) {
        // if its missing .txt, still valid
        const LazyComponent = files[filename.toLowerCase() + ".txt"];
        return [
          <>
            <div>{asciiLine}</div>
            <Suspense
              fallback={
                <span>
                  <Spinner /> Loading...
                </span>
              }
            >
              <LazyComponent />
            </Suspense>
            <div>{asciiLine}</div>
          </>,
        ]; // Return the contents if file exists
      } else {
        return [
          <div key="error" className="error">
            File not found: {filename}
          </div>,
        ]; // Handle file not found
      }
    },
    theme: (args) => {
      const newTheme = args[0]; // Get the new theme
      if (!newTheme) {
        return [
          <div key="error" className="error">
            Invalid argument: null
          </div>,
        ];
      }
      if (newTheme.toLowerCase() === "list") {
        return Object.keys(themes);
      }
      if (themes[newTheme.toLowerCase()]) {
        setCurrentTheme(themes[newTheme.toLowerCase()]); //update the current theme
        return [`Theme set to: ${newTheme}`];
      } else {
        return [
          <div key="error" className="error">
            Theme not found: {newTheme}
          </div>,
        ];
      }
    },
    crt: () => {
      const previous = isCRTOn;
      setIsCRTOn((prev) => !prev);
      return [`CRT mode set to: ${!previous}`];
    },
    linkedin: [
      <a
        key="linkedin"
        target="_blank"
        href="https://www.linkedin.com/in/jasper-chong-012345678910111213/"
        className="link"
      >
        linkedin.com/jasperchong
      </a>,
    ],
    github: [
      <a
        key="github"
        target="_blank"
        href="https://github.com/jasperchongcode"
        className="link"
      >
        github.com/jasperchongcode
      </a>,
    ],
    email: [
      <a key="email" href="mailto: contact@jasperchong.com" className="link">
        contact@jasperchong.com
      </a>,
    ],
    website: [
      <a key="website" href="https://jasperchong.com" className="link">
        jasperchong.com
      </a>,
    ],
    spotify: [
      <a
        key="spotify"
        target="_blank"
        href="https://open.spotify.com/user/7mqmetexug75muj9bosr7cd40?si=0f1f1ecfd5e84b4f&nd=1&dlsi=c73852fab98749db"
        className="link"
      >
        spotify.com/jasperchong
      </a>,
    ],
  };

  // Update the colour theme
  const changeTheme = (newTheme = "default-theme") => {
    const themer = document.getElementById("themer");
    themer.className = newTheme; // Sets the class to "new-class"
  };

  // Change crt effect
  const setCRT = (on) => {
    const crt = document.getElementById("crt");
    crt.className = on ? "crt" : "";
  };

  // Function to resize the input and cursor position
  const resizeInput = () => {
    const input = inputRef.current;
    const cursor = cursorRef.current;

    if (input && cursor) {
      input.style.width = `${input.value.length + 1}ch`; // Add 1 for padding
      cursor.style.left = `${input.selectionStart}ch`; // Cursor to the right of the text

      setIsBlinking(false);
      setTimeout(() => setIsBlinking(true), 1000);
    }
  };

  // the command input is optional, and if not provided will parse it from the input field
  const processUserCommand = (userCommand) => {
    setRecommendations([]);
    if (userCommand !== "") {
      // Add the new command to the terminal output
      setCommands((prevCommands) => [
        ...prevCommands,
        [terminalText, userCommand],
      ]);

      // Check for response based on the command
      const commandParts = userCommand.split(" ");
      const command = commandParts[0];
      const args = commandParts.slice(1); // Get any arguments

      // if it is a valid command
      if (responses[command.toLowerCase()]) {
        const response =
          typeof responses[command.toLowerCase()] === "function"
            ? responses[command.toLowerCase()](args) // Call function if it's a dynamic response
            : responses[command.toLowerCase()]; // Get static response

        // If the response is an array, add each line separately
        if (Array.isArray(response)) {
          setCommands((prevCommands) => [
            ...prevCommands,
            ...response.map((line) => [line, ""]), // Wrap each line in an array
          ]);
        } else {
          // For non-array responses, just add it directly
          setCommands((prevCommands) => [...prevCommands, [response]]);
        }
      } else if (hiddenResponses[command.toLowerCase()]) {
        // handle easter egg responses
        const response =
          typeof hiddenResponses[command.toLowerCase()] === "function"
            ? hiddenResponses[command.toLowerCase()](args) // Call function if it's a dynamic response
            : hiddenResponses[command.toLowerCase()]; // Get static response

        // If the response is an array, add each line separately
        if (Array.isArray(response)) {
          setCommands((prevCommands) => [
            ...prevCommands,
            ...response.map((line) => [line, ""]), // Wrap each line in an array
          ]);
        } else {
          // For non-array responses, just add it directly
          setCommands((prevCommands) => [...prevCommands, [response]]);
        }
      } else {
        // Handle unknown command
        setCommands((prevCommands) => [
          ...prevCommands,
          [
            <span key="error" className="error">
              Command not found:{" "}
            </span>,
            userCommand,
          ],
        ]);
      }
    }
  };

  // Function to handle the Enter key press
  const handleKeyPress = (event) => {
    // Resize the input (including moving the cursor)
    setTimeout(() => resizeInput(), 0); // small timeout is used for making sure selection location is updated

    if (event.key === "Enter") {
      processUserCommand(currentInput.trim());
      setCurrentInput(""); // clear the current input
    }
    // for tab autofill
    else if (event.key === "Tab") {
      event.preventDefault(); // Prevent default tab behavior (moving focus)

      const inputParts = currentInput.trim().split(" ");
      // if its only "one command"
      if (inputParts.length === 1 && currentInput.trim()) {
        // Autocomplete commands
        const matches = Object.keys(responses).filter((cmd) =>
          cmd.startsWith(inputParts[0].toLowerCase())
        );
        if (matches.length === 1) {
          setCurrentInput(matches[0]); // Autofill if only one match
        } else if (matches.length > 1) {
          setRecommendations(matches);
        }
      } else if (inputParts.length === 2 && currentInput.trim()) {
        var optionList = []; // set to nothing by default

        // Check what the first command is to determine the valid options
        if (inputParts[0].toLowerCase() === "read") {
          optionList = Object.keys(files);
        } else if (inputParts[0].toLowerCase() === "theme") {
          optionList = [...Object.keys(themes), "list"];
        }
        // Fine the matches
        const matches = optionList.filter((option) =>
          option.startsWith(inputParts[1].toLowerCase())
        );

        if (matches.length === 1) {
          setCurrentInput(`${inputParts[0]} ${matches[0]}`);
        } else if (matches.length > 1) {
          setRecommendations(matches);
        }
      }
    }
  };

  // Function to focus on the input field on click
  const handleClick = () => {
    inputRef.current.focus(); // Focus the input field when the document is clicked
  };

  // function to read the url and display a page if its in the url
  const handleParsePath = () => {
    // - indicates a space in a command
    // / indicates a "newline" (or seperates different commands)
    const pathName = window.location.pathname.slice(1); // get the "filename"
    if (!pathName) {
      // if its a url with nothing extra
      return;
    }
    // setCurrentInput(pathName.replaceAll("/", " "));
    const commands = pathName.replaceAll("-", " ").split("/");

    console.log("User command", commands);

    commands.forEach((command) => processUserCommand(command));
  };

  // Auto scroll to bottom when commands updated (our tab autofill recommendations)
  useEffect(() => {
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [commands, recommendations]);

  // Resize the input at mount
  // Parse the url and display file (if url not null) at mount
  useEffect(() => {
    resizeInput(); // Resize the input initially
    handleParsePath();
  }, []);

  // Set the theme whenever current theme changes
  useEffect(() => {
    changeTheme(currentTheme);
  }, [currentTheme]);

  // Set CRT effect whenever the boolean changes
  useEffect(() => {
    // console.log("SETTING CRT")
    setCRT(isCRTOn);
  }, [isCRTOn]);

  return (
    <div id="themer" className="efault-theme">
      <div id="crt" className="crt">
        {/* Full window (above is to set the colour theme) */}
        <main className="px-6 pt-2 h-screen flex flex-col justify-start bg-inherit">
          {/* Display terminal commands */}
          <div
            id="terminal-output"
            ref={outputRef}
            className="overflow-auto flex-grow mb-4 flex flex-col"
          >
            {commands.map((command, index) => (
              <div key={index}>
                {command.length == 2 ? (
                  <span>
                    {command[0]}{" "}
                    <span className="typing-text">{command[1]}</span>
                  </span>
                ) : (
                  <span>{command}</span>
                )}
              </div>
            ))}

            {/* Input Field as part of the terminal */}
            <p
              id="input-wrapper"
              className="flex items-center"
              onClick={handleClick}
            >
              <span className="mr-2">{terminalText}</span>
              <span className="relative">
                {/* Fake input for CRT effects */}
                <span className="typing-text pointer-events-none z-10">
                  {currentInput}
                </span>
                <input
                  id="command-input"
                  type="text"
                  className="opacity-0 z-20 typing-input bg-transparent outline-none typing-text w-auto min-w-[1rem] flex-grow caret-transparent"
                  value={currentInput}
                  onChange={(e) => {
                    // console.log("setting current input to", e.target.value)
                    setCurrentInput(e.target.value);
                    resizeInput(); // Resize input on change
                  }}
                  onKeyDown={handleKeyPress}
                  onClick={resizeInput} // for handling moving cursor when clicking middle of string
                  ref={inputRef}
                  autoFocus
                />
                {/* Cursor */}
                <span
                  ref={cursorRef}
                  className={`cursor absolute ${
                    isBlinking ? "cursor-animation" : ""
                  }`}
                ></span>
              </span>
            </p>
            {/* Display tab autofill recommendations if more than one*/}
            <div id="recommendations" className="grid grid-cols-1">
              {recommendations.map((recommendation, id) => (
                <div key={id}>{recommendation}</div>
              ))}
            </div>
            {/* This is so you can click in the empty space below the input and auto focus on the input */}
            <div
              id="empty-space"
              className="flex-grow pb-2"
              onClick={handleClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
