const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = "john_doe_17091999"; // Change to your name and DOB
const EMAIL = "john@xyz.com"; // Change to your email
const ROLL_NUMBER = "ABCD123"; // Change to your roll number

// POST /bfhl - Process data
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

    res.json({
        is_success: true,
        user_id: USER_ID,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        numbers,
        alphabets,
        highest_alphabet
    });
});

// GET /bfhl - Return operation code
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
