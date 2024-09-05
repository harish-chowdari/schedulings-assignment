const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    timeSlots: [{
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        allDay: {
            type: Date
        }
    }]
});

module.exports = mongoose.model("Schema1", Schema);
