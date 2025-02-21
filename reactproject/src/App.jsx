import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State for JSON input
  const [input, setInput] = useState("");
  // State to hold API POST response
  const [apiResponse, setApiResponse] = useState(null);
  // State for GET response (operation code)
  const [operationCode, setOperationCode] = useState(null);
  // State for filter selection from the multi-select dropdown
  const [filters, setFilters] = useState([]);

  // Set website title to your roll number
  useEffect(() => {
    document.title = "ABCD123"; // Replace with your roll number
  }, []);

  // Function to handle POST submission
  const handlePostSubmit = async () => {
    try {
      // Validate input is proper JSON
      const jsonData = JSON.parse(input);
      // Make the POST API call
      const res = await axios.post("https://22-bcs-13961.vercel.app/bfhl", jsonData);
      setApiResponse(res.data);
    } catch (error) {
      alert("Invalid JSON input or API error!");
      console.error(error);
    }
  };

  // Function to handle GET API call
  const handleGetRequest = async () => {
    try {
      const res = await axios.get("https://22-bcs-13961.vercel.app/bfhl");
      setOperationCode(res.data.operation_code);
    } catch (error) {
      alert("Error calling GET API");
      console.error(error);
    }
  };

  // Function to filter response data based on selected options
  const getFilteredResponse = () => {
    if (!apiResponse) return null;
    let filtered = {};
    filters.forEach((filter) => {
      if (apiResponse[filter] !== undefined) {
        filtered[filter] = apiResponse[filter];
      }
    });
    return filtered;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>BFHL Frontend</h1>
      
      {/* POST Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>POST Request</h2>
        <textarea
          rows="5"
          cols="50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data": ["A", "C", "z"]}'
        />
        <br />
        <button onClick={handlePostSubmit}>Submit POST</button>
      </div>

      {apiResponse && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Response from POST</h2>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>

          <h3>Select Filters</h3>
          <select
            multiple
            onChange={(e) =>
              setFilters(Array.from(e.target.selectedOptions, option => option.value))
            }
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <h3>Filtered Response</h3>
          <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
        </div>
      )}

      {/* GET Section */}
      <div style={{ marginBottom: "20px" }}>
        <h2>GET Request</h2>
        <button onClick={handleGetRequest}>Call GET API</button>
        {operationCode !== null && (
          <div>
            <h3>Operation Code</h3>
            <pre>{operationCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
