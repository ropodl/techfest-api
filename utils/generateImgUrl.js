exports.ImgUrl = (req, res, file) => {
  const imgUrl =
    (process.env.app_dev === "development" ? "http" : "https") +
    "://" +
    req.headers.host +
    "/" +
    file.path;
  return imgUrl;
};
