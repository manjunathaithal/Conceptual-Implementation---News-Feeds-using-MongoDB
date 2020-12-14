const express = require("express");
const app = express();
const port = 8080;

const { newsArticleModel } = require("./connector");

const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req, res) => {
  const { limit, offset } = req.body;
  const limits = limit === "undefined" ? 10 : isNaN(limit) ? 10 : limit;
  const offsets = offset === "undefined" ? 0 : isNaN(limit) ? 0 : offset;
  const value = await newsArticleModel.find().skip(offsets).limit(limits);
  res.send(value);
  // console.log(isnullorUndefined(limit), isnullorUndefined(this.offset));
  // const limit = limits==="undefined"?10:isNaN(limits)?
  // if (isnullorUndefined(limit) && isnullorUndefined(offset)) {
  //   const data = await newsArticleModel.find().skip().limit(10);
  //   res.send(data);
  // }
  // if (!isnullorUndefined(limit) || !isnullorUndefined(offset)) {
  //   if (!isnullorUndefined(limit) && !isnullorUndefined(offset)) {
  //     const data = await newsArticleModel.find().skip(offset).limit(limit);
  //     res.send(data);
  //   }
  //   if (!isnullorUndefined(limit)) {
  //     const data = await newsArticleModel.find().skip().limit(limit);
  //     res.send(data);
  //   }
  //   if (!isnullorUndefined(offset)) {
  //     const data = await newsArticleModel.find().skip(offset).limit(10);
  //     res.send(data);
  //   }
  // }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
