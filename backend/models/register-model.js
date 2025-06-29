const mongoose = require("mongoose")

const registerSchema = ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("register", registerSchema)