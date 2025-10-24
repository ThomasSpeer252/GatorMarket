import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Use localhost if running in browser, "backend" if fetching from another container
  const apiUrl = "http://localhost:8000/gatormarket/";

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching from:", `${apiUrl}test/`);
      try {
        const res = await fetch(`${apiUrl}test/`);
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        console.log("Data received:", json);
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <div>
        <h2>API Data:</h2>
        <pre>
          {error
            ? `Error: ${error}`
            : data
            ? JSON.stringify(data, null, 2)
            : "Loading..."}
        </pre>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
