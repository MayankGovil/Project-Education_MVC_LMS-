const mongoose = require('mongoose');
require('../../db/config')
const AddVideoSchema = new mongoose.Schema({
    coursecategory:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses',

    },
    videotopic:
    {
        type: String,
        required: true
    },
    videourl:
    {
        type: String,
        required: true
    },
    videostatus:
    {
        type: Boolean,
        required: true
    }
});

const Video = mongoose.model('Videos', AddVideoSchema);
module.exports = Video;