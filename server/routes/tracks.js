const router = require("express").Router();
const multer = require("multer");
const track = require("../models/track");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: "uploads/", // Specify the folder to store uploaded images
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

//import our track model

//Get all Tracks

router.get("/getAll", async (req, res) => {
  const data = await track.find();
  if (data) {
    return res.status(200).send({ success: true, track: data });
  } else {
    return res.status(400).send({ success: false, message: "Data not found" });
  }
});

//Get an image for the track

router.get("/image/:name", async (req, res) => {
  console.log(req.params.name);

  const imagePath =
    "/Users/Matan/Desktop/NodeJs/Music-App/server/uploads/" +
    req.params.name +
    ".png";

  res.sendFile(imagePath);
});

//Post a track
router.post("/save", async (req, res) => {
  const newTrack = track({
    title: req.body.title,
    artist: req.body.artist,
    albums: req.body.album,
    duration: req.body.duration,
    imgUrl: req.body.imgUrl,
    trackUrl: req.body.trackUrl,
    trackAbout: req.body.trackAbout,
    genres: req.body.genres,
    moods: req.body.moods,
    instruments: req.body.instruments,
    isLiked: req.body.isLiked,
  });

  try {
    const savedTrack = await newTrack.save();
    return res.status(200).send({ success: true, track: savedTrack });
  } catch (error) {
    return res.status(400).send({ success: false, message: error });
  }
});

//Post a image for track
router.post("/uploadImage", upload.single("image"), async (req, res) => {
  console.log(req.file);
});

//Delete a track
router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await track.deleteOne(filter);

  if (result) {
    return res.status(200).send({ success: true, message: "Track deleted" });
  } else {
    return res
      .status(400)
      .send({ success: false, message: "There was a problem" });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const updatedTrack = {
    title: req.body.title,
    artist: req.body.artist,
    duration: req.body.duration,
    imgUrl: req.body.imgUrl,
    trackUrl: req.body.trackUrl,
    genre: req.body.genre,
    mood: req.body.mood,
    instruments: req.body.instruments,
    isLiked: req.body.isLiked,
  };

  const options = { new: true };

  const result = await track.findOneAndUpdate(filter, updatedTrack, options);

  if (result) {
    return res.status(200).send({ success: true, message: "Track updated" });
  } else {
    return res
      .status(400)
      .send({ success: false, message: "There was a problem" });
  }
});

router.put("/updateIsLiked/:id", async (req, res) => {
  const trackId = req.params.id;
  const updatedData = req.body;

  track
    .findByIdAndUpdate(trackId, { isLiked: updatedData.isLiked }, { new: true })
    .then((updatedTrack) => {
      res.json(updatedTrack);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to update track isLiked status." });
    });
});

module.exports = router;
