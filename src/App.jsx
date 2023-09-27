import { useEffect, useState } from "react";

function App() {
  const controller = new AbortController();
  const [count1, setCount1] = useState("");
  const [count2, setCount2] = useState("");
  const [input, setInput] = useState(200);
  const [p, setP] = useState("");

  let countryNameone = ["USD", "EUR"];
  let countryNameTwo = ["INR", "CAD"];

  async function api() {
    if (count1 && count2) {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${count1}&to=${count2}`,
        { signal: controller.signal }
      );
      const res = await response.json();
      console.log(res.rates);
      setP(res.rates[count2]); // Set the value associated with the selected currency in state
    }
  }

  useEffect(() => {
    // You can call the API here when count1, count2, or input changes
    api();
    return function () {
      controller.abort();
    };
  }, [count1, count2, input]);

  return (
    <>
      <div
        className="Main-Count"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <input
          type="text"
          placeholder="Currency"
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <select name="" id="" onChange={(e) => setCount1(e.target.value)}>
          {countryNameone.map((e, i) => {
            return <option key={i}>{e}</option>;
          })}
        </select>
        <select name="" id="" onChange={(e) => setCount2(e.target.value)}>
          {countryNameTwo.map((e, i) => {
            return <option key={i}>{e}</option>;
          })}
        </select>
      </div>

      <center>
        {/* Display the value associated with the selected currency */}
        <p className="Value"> Value {p}</p>
      </center>
    </>
  );
}

export default App;
