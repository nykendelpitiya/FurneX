const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db");

dotenv.config();

// Connect database
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});