'use strict';

const ParticipantModel = require('../../../models/v1/participant');

module.exports = {

    get : (req, res, next) => {
        ParticipantModel
            .findOne({ email : req.body.email, cpf: req.body.cpf })
            .select('-_id')
            .exec((err, participant) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(participant)
            });
    }

};