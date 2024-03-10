import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";

function App() {
  // State variables
  const [length, setLength] = useState(8); // Password length
  const [numberAllowed, setNumberAllowed] = useState(false); // Whether numbers are allowed in the password
  const [charAllowed, setCharAllowed] = useState(false); // Whether special characters are allowed in the password
  const [password, setPassword] = useState(""); // Generated password

  // useRef hook for referencing password input
  const passwordRef = useRef(null);

  // Function to generate a password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; // Default characters

    // If numbers are allowed, add them to the character set
    if (numberAllowed) str += "0123456789";
    // If special characters are allowed, add them to the character set
    if (charAllowed) str += "`!@#$%^&*(){}[]<>/|:;',.?_~``";

    // Generate the password using the character set and specified length
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    // Update the password state
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Function to copy the password to the clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    document.execCommand("copy"); // Copy the selected text to clipboard
  }, [password]);

  // Effect to generate a new password whenever relevant state variables change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // JSX rendering
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
      <h1 className="text-white text-center my-3 font-mono pt-2 font-bold">
        🔒Password Generator🔑
      </h1>

      {/* Password display and copy button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 bg-white text-blue-700"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-1.5"
        >
          Copy
        </button>
      </div>

      {/* Password options */}
      <div className="flex text-sm gap-x-2 pb-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />

          <label className="text-white" htmlFor="numberInput">
            Numbers
          </label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />

          <label className="text-white" htmlFor="characterInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
