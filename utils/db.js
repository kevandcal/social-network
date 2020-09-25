const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require("../secrets");
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/socialnetwork`);
}

exports.addUser = function (first, last, email, password) {
    return db
        .query(
            `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [first || null, last || null, email || null, password || null]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getPassword = function (email) {
    return db
        .query(
            `SELECT id, password
            FROM users
            WHERE email=$1`,
            [email]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getUserInfo = function (id) {
    return db
        .query(
            `SELECT id, first, last, profilepic, bio
            FROM users
            WHERE id=$1`,
            [id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getNewestUsers = function () {
    return db
        .query(
            `SELECT id, first, last, profilepic
            FROM users
            ORDER BY id DESC
            LIMIT 3`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getMatchingUsers = function (val) {
    return db
        .query(
            `SELECT id, first, last, profilepic
            FROM users
            WHERE first || ' ' || last ILIKE $1
            ORDER BY first ASC`,
            [val + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.uploadPic = function (id, profilePic) {
    return db
        .query(
            `UPDATE users
            SET profilepic=$2
            WHERE id=$1
            RETURNING profilepic`,
            [id, profilePic]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.updateBio = function (id, bio) {
    return db
        .query(
            `UPDATE users
            SET bio=$2
            WHERE id=$1
            RETURNING bio`,
            [id, bio]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendshipStatus = function (senderId, receiverId) {
    return db
        .query(
            `SELECT *
            FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1)`,
            [senderId, receiverId]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.sendFriendRequest = function (senderId, receiverId) {
    return db
        .query(
            `INSERT INTO friendships (sender_id, receiver_id)
            VALUES ($1, $2)
            RETURNING accepted`,
            [senderId, receiverId]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.acceptFriendRequest = function (senderId, receiverId) {
    return db.query(
        `UPDATE friendships
            SET accepted = true
            WHERE (sender_id = $1 AND receiver_id = $2)`,
        [senderId, receiverId]
    );
};

exports.deleteFriend = function (senderId, receiverId) {
    return db
        .query(
            `DELETE FROM friendships
            WHERE (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)`,
            [senderId, receiverId]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendsAndWannabes = function (id) {
    return db
        .query(
            `SELECT users.id, first, last, profilepic, accepted
            FROM friendships
            JOIN users
            ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
            [id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getLastTenMessages = function () {
    return db
        .query(
            `SELECT message, first, last, profilepic
            FROM chats
            JOIN users
            ON (chats.sender_id = users.id)
            ORDER BY chats.created_at DESC
            LIMIT 10`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addMessage = function (sender_id, msg) {
    return db
        .query(
            `INSERT INTO chats (sender_id, message)
            VALUES ($1, $2)
            RETURNING message`,
            [sender_id, msg]
        )
        .then(({ rows }) => {
            return rows;
        });
};
