const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const {client} = require("../config/database");
const SALT_ROUNDS = 10;

const create = async (req, res) => {
    const { password, username, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    if (password.length < 3) {
        return res.status(400).json({ error: "your password is too short" });
    }
    if (password.length > 30) {
        return res.status(400).json({ error: "your password is too long" });
    }
    if (username.length > 50) {
        return res.status(400).json({ error: "your name is too long" });
    }
    try {
        const { rows } = await client.query(
            `INSERT INTO users 
            (username, email, password) 
            VALUES ($1, $2, $3)
            RETURNING *`,
            [username, email, hashedPassword]
        );
        const payload = rows[0];
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 * 60 });
        res.status(201).json(token);
    } catch (error) {
        res.status(500).json(error);
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const {rows} = await client.query(
            `SELECT * FROM users
            WHERE email = $1`, [email]);
        const user = rows[0];
        if (!user) {
            res.status(401).json({ message: "User or password is invalid" });
            return;
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const payload = { user };
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60*60 });
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "User or password is invalid" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const checkBookmark = async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({ error: "User is missing" });
    }
    try {
        const user = await User.findById(id).populate({
            path: 'bookmarks',
            options: { strictPopulate: false },
            populate: { path: 'owner', model: 'User' }
          }).exec();
            const bookmarksArray = []
            user.bookmarks.forEach(recipe => {
                const averageRating = calculateAverageRating(recipe.rating)
                bookmarksArray.push({
                  ...recipe.toJSON(),
                  averagerating: averageRating
                })
            })
            const updatedUser = {...user.toJSON(), bookmarksArray: bookmarksArray}
            res.status(200).json( updatedUser );  
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Server error" });
        }
    };

    const calculateAverageRating = (ratings) => {
        let total = 0;
        ratings.forEach((r) => {
          total += r.rating;
        });
        const averageRating = (total / ratings.length).toFixed(2);
        if (isNaN(averageRating) || !averageRating ) return "No Rating"
        return parseFloat(averageRating);
      };

module.exports = {
    create,
    login,
    checkBookmark
};