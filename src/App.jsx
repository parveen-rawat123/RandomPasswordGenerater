import { useState, useCallback ,useEffect,useRef} from "react";

function App() {
  const [length, setlenght] = useState(8);
  const [number, setnumber] = useState(false);
  const [charecter, setcharecter] = useState(false);
  const [password, setpassword] = useState("");

  //ref hook
const passwordfer = useRef(null)

  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charecter) str += "~!@#$%^&*(){}[]`/=\\?<>,.;:";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, number, charecter, setpassword]);

  const copypasswordtoclipboard = useCallback(()=>{ 
    passwordfer.current?.select();
   window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenrator()
  },[length,number,charecter,passwordgenrator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordfer}
          />
          <button
          onClick={copypasswordtoclipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlenght(e.target.value);
              }}
            />
            <label htmlFor=""> Length :{length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numbersInput"
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
            <label htmlFor="numbersInput"> Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charecter}
              id="characterInput"
              onChange={() => {
                setcharecter((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
