const express = require("../node_modules/express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
var MongoDB = "mongodb://127.0.0.1/VisitorDB";
mongoose.connect(MongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.get("/", (request,response) => {
  response.sendFile(path.join(__dirname + "./index.html"));
});
app.post("/", (req, res) => {
  addNewVisitor(req.body);
  res.send(req.body)
  db.collection("new_visit")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .toArray(function (err, result) {
      if (err) throw err;
      console.log(result[0].VisitorName);
      console.log(req.body);
      res.render("index", {
        fullName: result[0].VisitorName,
        nameOfAssistant: result[0].AssistantName,
        visitorsAge: result[0].VisitorAge,
        dateOfVisit: result[0].DateOfVisit,
        timeOfVisit: result[0].TimeOfVisit,
        comments: result[0].Comments,
      });
    });
});

function addNewVisitor(req) {
  db.collection("new_visit").insertOne(req);
}
app.listen(port, () => {
  console.log(`database started on ://localhost: ${port}`);
});
