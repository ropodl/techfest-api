exports.ImgUrl = (req, res, file) => {
  return (
    (process.env.app_dev ? "http://" : "https://") +
    req.hostname +
    (process.env.app_port ? `:${process.env.app_port}` : "") +
    "/" +
    file.path
  );
};
