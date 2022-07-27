const users = require("../database/users")

const userController = {
    login: (req,res) =>{
        res.render("users/login",
        {
            users
        }
        )
    },
    register: (req,res) =>{
        res.render("users/register",
        {
            users
        }
        )
}
}

module.exports = userController