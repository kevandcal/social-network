const express = require("express");
const app = express();
const compression = require("compression");
const { hash, compare } = require("./utils/bc");
const db = require("./utils/db");
const cs = require("cookie-session");
const csurf = require("csurf");
const s3 = require("./s3");
const config = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 myapp.herokuapp.com:*"
});

///// FILE UPLOAD BOILERPLATE:
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 6000000
    }
});

const cookieSessionMiddleware = cs({
    secret: "The sky is blue",
    // secret: process.env.SESS_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(compression());
app.use(express.json());
app.use(csurf());

app.use(express.static("./public"));

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    console.log("index.js POST /registration req.body: ", req.body);
    console.log("req.session: ", req.session);
    let first = req.body.first;
    if (first) {
        first = first.toLowerCase();
        first = first.charAt(0).toUpperCase() + first.substring(1);
    }
    let last = req.body.last;
    if (last) {
        last = last.toLowerCase();
        last = last.charAt(0).toUpperCase() + last.substring(1);
    }
    let email = req.body.email;
    let password = req.body.password;

    hash(password)
        .then(hash => {
            console.log("hash: ", hash);
            db.addUser(first, last, email, hash)
                .then(results => {
                    console.log(
                        "index.js POST /registration hash then addUser then results: ",
                        results
                    );
                    req.session.userId = results[0].id;
                    res.json({
                        success: "yes"
                    });
                })

                .catch(err => {
                    console.log(
                        "index.js POST /registration hash db.addUser catch err: ",
                        err
                    );
                    res.json({
                        success: "no"
                    });
                });
        })
        .catch(err => {
            console.log("index.js POST /registration hash catch err: ", err);
            res.json({
                success: "no"
            });
        });
});

app.post("/login", (req, res) => {
    let email = req.body.email;
    db.getPassword(email)
        .then(results => {
            console.log(
                "index.js POST /login post route getPassword results: ",
                results
            );
            compare(req.body.password, results[0].password)
                .then(match => {
                    if (match) {
                        if (!req.session.userId) {
                            req.session.userId = results[0].id;
                        }
                        res.json({
                            success: "yes"
                        });
                    } else {
                        res.json({
                            success: "no"
                        });
                    }
                })
                .catch(err => {
                    console.log(
                        "index.js POST /login getPassword compare catch err: ",
                        err
                    );
                    res.json({
                        success: "no"
                    });
                });
        })
        .catch(err => {
            console.log("index.js POST /login getPassword catch err: ", err);
            res.json({
                success: "no"
            });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const profilepic = config.s3Url + filename;
    // const { profilepic } = req.body;
    console.log("POST /upload profilepic before db.uploadPic: ", profilepic);
    db.uploadPic(req.session.userId, profilepic)
        .then(results => {
            // console.log(
            //     "index.js POST /upload db.uploadPic then results: ",
            //     results
            // );
            res.json(results);
        })
        .catch(err => {
            console.log(
                "index.js POST /upload db.uploadPicture catch err: ",
                err
            );
        });
});

app.post("/bio", (req, res) => {
    console.log("index.js POST /bio req.body: ", req.body);
    db.updateBio(req.session.userId, req.body.bio)
        .then(results => {
            // console.log(
            //     "index.js POST /bio db.updateBio then results: ",
            //     results[0].bio
            // );
            res.json(results[0].bio);
        })
        .catch(err => {
            console.log("index.js POST /bio db.updateBio catch err: ", err);
        });
});

app.get("/user", (req, res) => {
    db.getUserInfo(req.session.userId)
        .then(results => {
            res.json(results[0]);
        })
        .catch(err => {
            console.log("index.js GET /user db.getUserInfo catch err: ", err);
        });
});

app.get("/api/user/:id", (req, res) => {
    db.getUserInfo(req.params.id)
        .then(results => {
            res.json({
                user: results[0],
                ownUserId: req.session.userId
            });
        })
        .catch(err => {
            console.log(
                "index.js GET /user/:id db.getUserInfo catch err: ",
                err
            );
            res.json({});
        });
});

app.get("/newestusers", (req, res) => {
    db.getNewestUsers()
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log(
                "index.js GET /users db.getNewestUsers catch err: ",
                err
            );
        });
});

app.get("/matchingusers/", (req, res) => {
    // console.log("req.query in index.js GET /matchingusers/: ", req.query);
    db.getMatchingUsers(req.query.q)
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.log(
                "index.js GET /users db.getMatchingUsers catch err: ",
                err
            );
        });
});

app.get("/api/friends/:id", (req, res) => {
    const senderId = req.session.userId;
    const receiverId = req.params.id;
    db.getFriendshipStatus(senderId, receiverId)
        .then(results => {
            res.json({
                ownUserId: senderId,
                friendship: results[0]
            });
        })
        .catch(err => {
            console.log(
                "index.js GET /api/friends/:id getFriendshipStatus catch err: ",
                err
            );
        });
});

app.post("/api/friendrequest/:id", (req, res) => {
    db.sendFriendRequest(req.session.userId, req.params.id)
        .then(results => {
            // console.log(
            //     "index.js POST /api/friendrequest/:id db.sendFriendRequest then results: ",
            //     results[0]
            // );
            res.json(results[0]);
        })
        .catch(err => {
            console.log(
                "index.js POST /api/friendrequest/:id db.sendFriendRequest catch err: ",
                err
            );
        });
});

app.post("/api/deletefriend/:id", (req, res) => {
    db.deleteFriend(req.session.userId, req.params.id)
        .then(results => {
            // console.log(
            //     "index.js POST /api/deletefriend/:id db.deleteFriend then results: ",
            //     results[0]
            // );
            res.json(results[0]);
        })
        .catch(err => {
            console.log(
                "index.js POST /api/deletefriend/:id db.deleteFriend catch err: ",
                err
            );
        });
});

app.post("/api/acceptfriend/:id", (req, res) => {
    db.acceptFriendRequest(req.params.id, req.session.userId)
        .then(() => {
            res.json({
                success: true
            });
        })
        .catch(err => {
            console.log(
                "index.js POST /api/acceptfriend/:id db.acceptFriendRequest catch err: ",
                err
            );
        });
});

app.get("/friends-wannabes", (req, res) => {
    db.getFriendsAndWannabes(req.session.userId)
        .then(data => {
            // console.log("GET /friends-wannabes then data: ", data);
            res.json({
                ownUserId: req.session.userId,
                friendsAndWannabes: data
            });
        })
        .catch(err => {
            console.log("GET /friends-wannabes catch err: ", err);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/cute-animals.json", (req, res) => {
    console.log("GET /cute-animals.json running!");
    res.json([
        {
            name: "giraffe",
            cutenessScore: 10
        },
        {
            name: "cat",
            cutenessScore: 9
        }
    ]);
});

app.get("/welcome", (req, res) => {
    if (
        req.session.userId &&
        (req.url === "/welcome#/" || req.url === "/welcome#/login")
    ) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

/////// THIS ROUTE BELOW TO BE THE LAST ONE ////////

app.get("*", function(req, res) {
    if (
        !req.session.userId &&
        (req.url != "/welcome#/" || req.url != "/welcome#/login")
    ) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

/////// THIS ROUTE ABOVE TO BE THE LAST ONE ////////

server.listen(8080, function() {
    console.log("I'm listening.");
});

// SERVER-SIDE SOCKET CODE //
io.on("connection", function(socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    db.getLastTenMessages()
        .then(data => {
            console.log(
                "index.js io.on 'connection' GET /api/chat db.getMessages then data: ",
                data
            );
            io.sockets.emit("chatMessages", data.reverse());
        })
        .catch(err => {
            console.log(
                "index.js io.on 'connection' GET /api/chat db.getMessages catch err: ",
                err
            );
        });

    socket.on("I wish I could use axios.post", msg => {
        console.log("message received!");
        console.log("And this is the message: ", msg);
        db.addMessage(userId, msg)
            .then(data => {
                console.log(
                    "index.js io.on socket.on 'I wish I could use axios.post' db.addMessage then data: ",
                    data
                );
                db.getUserInfo(userId)
                    .then(data => {
                        console.log(
                            "index.js io.on socket.on 'I wish I could use axios.post' db.addMessage then db.getUserInfo then data: ",
                            data
                        );
                        let obj = {
                            first: data[0].first,
                            last: data[0].last,
                            profilepic: data[0].profilepic,
                            message: msg
                        };
                        io.sockets.emit("chatMessage", obj);
                    })
                    .catch();
            })
            .catch(err => {
                console.log(
                    "index.js io.on socket.on 'I wish I could use axios.post' db.addMessage catch err: ",
                    err
                );
            });
    });

    // 2 things have to happen here:
    // 1. DB query to get last 10 chat messages: (db.getLastTenMessages().then(datat=>{
    // here is where we EMIT those chat messages, something like: io.sockets.emit('chatMessages', data.rows)
    //  }))
    // 2. Deal with new chat message(s):
    // socket.on('new message', (msg) => {
    // i. get all info about the users, i.e. DB query w/ userId
    // ii. add chat msg to DB.
    // iii. create chat msg object or use data from query above (if sufficient).
    // iv. io.sockets.emit('chatMessage', data.rows)
    // })
});
