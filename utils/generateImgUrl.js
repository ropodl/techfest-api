exports.ImgUrl = (req, res, file) => {
  const imgUrl =
    (process.env.app_dev.includes("true") ? "http" : "https") +
    "://" +
    req.headers.host +
    "/" +
    file.path;
  console.log(req.headers.host);
  return imgUrl;
};
