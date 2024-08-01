const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const db = require("./Model/Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator"); 


//<-----validation query for the input forms------------------------------->//

const validateUserRegistration = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("name").notEmpty().withMessage("Name is required"),
  body("company").optional().notEmpty().withMessage("Company name is invalid"),
];


//<-----------------------Registration---------------------------------->//


app.post("/users", validateUserRegistration, async (req, res) => {


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, name, company } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const q =
      "INSERT INTO users(`email`, `password`, `name`, `company`) VALUES (?)";
    const values = [email, hashedPassword, name, company];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred" });
  }
});



//<-----------------------Login form ---------------------------------->//

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = data[0]

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" }); 

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "secret@123",{ expiresIn: "1h" }  
    );

    return res.json({ token,data});
  });
});









app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



app.listen(8800, () => {
  console.log("server connected at 8800");
});
