const express = require("express");
const app = express();
const userroutes = require("./routes/routelogin");
const profileroutes = require("./routes/routeprofile");
const stockroutes = require("./routes/routestock");
const watchlistroute = require("./routes/routewatchlist");
const database = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware
app.use(express.json());
app.use(cookieparser());

// CORS Middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://sbroker.vercel.app",
      "https://sbroker-sanchay151s-projects.vercel.app",
      "https://sbroker-git-master-sanchay151s-projects.vercel.app",
    ];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow requests from allowed origins or non-browser clients
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies/auth tokens to be sent
};

app.use(cors(corsOptions));


// Routes
app.use("/api/v1/user", userroutes);
app.use("/api/v1/profile", profileroutes);
app.use("/api/v1/stock", stockroutes);
app.use("/api/v1/watchlist", watchlistroute);

// Root route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});


