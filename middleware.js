exports.requireSession = function(req, res, next) {
    // console.log("redirectToRegistration is running");
    if (
        !req.session.userId &&
        req.url != "/welcome" &&
        req.url != "/welcome#/login"
    ) {
        // console.log("redirectToRegistration if code block is running");
        res.redirect("/welcome");
    } else {
        // console.log("redirectToRegistration else code block is running");
        next();
    }
};

exports.requireNoSession = function(req, res, next) {
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
