exports.ImgUrl = (req, res, file) => {
  return (
    (process.env.app_dev == "true" ? "http://" : "https://") + req.hostname + (process.env.app_dev == "true" ? `:${process.env.app_port}` : "") + "/" +file.path
  );
};
