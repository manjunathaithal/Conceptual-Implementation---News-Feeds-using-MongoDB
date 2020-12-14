const express = require("express");
const app = express();
const port = 8080;
const { newsArticleModel } = require("./connector");
const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req, res) => {
  // const { limit, offset } = req.query;
  const limit = req.query.limit;
  const offset = req.query.offset;
  console.log(limit, offset);
  const limits = limit == "undefined" ? 10 : isNaN(limit) ? 10 : Number(limit);
  const offsets =
    offset == "undefined" ? 0 : isNaN(offset) ? 0 : Number(offset);

  const value = await newsArticleModel.find().skip(offsets).limit(limits);
  res.send(value);
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
