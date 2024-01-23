import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function App() {
  const [charCount, setCharCount] = useState(5);
  const [showStrength, setShowStrength] = useState(false);
  const [strength, setStrength] = useState("");

  const [useNumber, setUseNumber] = useState(false);
  const [useSymbol, setUseSymbol] = useState(false);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("COPY")

  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let number = "0123456789";
  let symbol = "!@#$%^&*()_+";

  const regexStrong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/;
  const regexWeak1 = /[a-z]/;
  const regexWeak2 = /[A-Z]/;
  const regexWeak3 = /\d/;
  const regexStrong2 = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopy(()=>"COPIED");
    console.log('Text copied to clipboard:', textToCopy);
  };


  function generatePassword(e) {
    e.preventDefault();
    console.log("caller");
    let characters = "";
    let password = "";
    if (useNumber) {
      characters += number;
    }
    if (useSymbol) {
      characters += symbol;
    }
    if (useLower) {
      characters += lowercase;
    }
    if (useUpper) {
      characters += uppercase;
    }
   
    for (let i = 0; i < charCount; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    setShowStrength(true);
    setPassword(password);
    setStrength(() => {
      if (password.length >= 6 && regexStrong.test(password) ||
      (password.length >= 4 && regexStrong2.test(password))) {
        return "Strong";
      } else if (
          password.length >= 6 &&
          regexWeak1.test(password) &&
          regexWeak2.test(password) &&
          regexWeak3.test(password)
        
      ) {
        return "Medium";
      } else if (
        regexWeak1.test(password) ||
        regexWeak2.test(password) ||
        regexWeak3.test(password)
      ) {
        return "Weak";
      }
    });
    setCopy(()=>"COPY");
    console.log(password);
  }

  function handleUpperChange() {
    setUseUpper((prev) => !prev);
  }
  function handleLowerChange() {
    setUseLower((prev) => !prev);
  }
  function handleSymbolChange() {
    setUseSymbol((prev) => !prev);
  }
  function handleNumberChange() {
    setUseNumber((prev) => !prev);
  }

  function handleSliderChange(event, value) {
    setCharCount(value);
  }
  function valuetext(value) {
    return `${value}`;
  }
  return (
    <>
      <div className="container">
        {showStrength && (
          <div className="header">
            <h3>{password}</h3>
            <input onClick={copyToClipboard} className="btn-copy" type="button" value={copy} />
          </div>
        )}

        <div className="header">
          <h3>Character Length</h3>
          <h3>{charCount}</h3>
        </div>
        <div className="slider">
          <Box sx={{ width: 450 }}>
            <Slider
              aria-label="Length"
              value={charCount}
              onChange={handleSliderChange}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={10}
            />
          </Box>
        </div>
        <div>
          <form onSubmit={generatePassword}>
            <div style={{ marginBottom: "10px" }}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        onChange={handleUpperChange}
                        checked={useUpper}
                        id="upparecase"
                      />
                    </td>

                    <td>
                      <label style={{ color: "white" }} htmlFor="upparecase">
                        Include Uppercase Letters
                      </label>
                    </td>

                    <td style={{ paddingLeft: "25px" }}>
                      <input
                        type="checkbox"
                        onChange={handleLowerChange}
                        checked={useLower}
                        id="lowercase"
                      />
                    </td>
                    <td>
                      <label style={{ color: "white" }} htmlFor="lowercase">
                        Include Lowercase Letters
                      </label>
                    </td>
                  </tr>
                  <tr style={{ paddingTop: "35px" }}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={handleNumberChange}
                        checked={useNumber}
                        id="numbers"
                      />
                    </td>
                    <td>
                      <label style={{ color: "white" }} htmlFor="numbers">
                        Include Numbers
                      </label>
                    </td>
                    <td style={{ paddingLeft: "25px" }}>
                      <input
                        type="checkbox"
                        onChange={handleSymbolChange}
                        checked={useSymbol}
                        id="symbols"
                      />
                    </td>
                    <td>
                      <label style={{ color: "white" }} htmlFor="symbols">
                        Include Symbols
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              {showStrength && (
                <div className="footer">
                  <h3>Strength:</h3>
                  <h3>{strength}</h3>
                </div>
              )}
              <input className="btn" type="submit" value="GENERATE PASSWORD" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
