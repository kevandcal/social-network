exports.requireSession = function (req, res, next) {
    if (
        !req.session.userId &&
        req.url != "/welcome" &&
        req.url != "/welcome#/login"
    ) {
        res.redirect("/welcome");
    } else {
        next();
    }
};

exports.requireNoSession = function (req, res, next) {
    console.log("requireNoSession is running");
    if (req.session.userId) {
        console.log("requireNoSession if code block is running");
        console.log("req.url: ", req.url);
        if (req.url == "/welcome" || req.url == "/welcome#/login") {
            location.replace("/");
        } else {
            console.log("requireNoSession else code block is running");
            next();
        }
    } else {
        next();
    }
};
