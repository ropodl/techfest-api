exports.isUserLoggedIn = (req, res, next) => {
    console.log(req);
    req.user ? next() : res.sendStatus(401);
}