const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "*", // for dev; tighten this after deployment
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Routes
app.use("/api/candidates", require("./routes/candidates"));
app.use("/api/match", require("./routes/match"));
app.use("/api/ai", require("./routes/ai"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 5001;
    app.listen(port, () =>
      console.log(`Server running on port ${port}`),
    );
  })
  .catch((err) => console.error(err));
