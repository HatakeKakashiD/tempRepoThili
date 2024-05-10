const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
    inquirycategory: {
        type: String,
        required: true
    },
    inquiryprioritization: {
        type: String,
        required: true
    },
    personemail: {
        type: String,
        required: true
    },
    personum: {
        type: String,
        required: true
    },
    personinquiry: {
        type: String,
        required: true
    },
    addedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    replies: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User' // Assuming you have a User model
        },
        message: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
