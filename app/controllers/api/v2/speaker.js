'use strict';

const SpeakerModel = require('../../../models/speaker');

module.exports = {

    get : (req, res, next) => {
        SpeakerModel
            .findOne({ email : req.body.email })
            .select('-_id')
            .exec((err, speaker) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(speaker)
            });
    }

};
