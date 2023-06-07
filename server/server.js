const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");
app.use(cors({ origin: true }));

const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => {
    console.log("connected");
  })
  .on("error", (error) => {
    console.log(`ERROR :${error}`);
  });

//tracks Routs
app.use(express.json());

const trackRouts = require("./routes/tracks");

app.use("/api/tracks", trackRouts);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));

app.get("/", (req, res) => {
  const filepath = "./public/index.html";
  res.sendFile(path.join(__dirname, filepath));
});
app.get("/about", (req, res) => {
  console.log("about page");
  res.sendFile(path.join(__dirname, filepath));
});



app.post("/verifyToken", (req, res) => {
  const { userId } = req.body;

  // Verify the token and check admin status
  checkAdmin(userId)
    .then((isVerifyed) => {
      if (isVerifyed) {
        res.json({ message: "Admin" });
      } else {
        res.json({ message: "NotAdmin" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

const admin = require("firebase-admin");

// Initialize the Admin SDK
const serviceAccount = require("./music-app-d9fea-firebase-adminsdk-5ocqx-3885740b10.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add other configurations if needed
});

// Specify the UID or email of the user you want to make an admin

async function checkAdmin(userId) {
  const adminId = process.env.ADMIN_ID;

  console.log(userId, adminId);
  try {
    return userId === adminId;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}
