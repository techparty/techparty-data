/*jslint node: true */

'use strict';

var ParticipantModel = require('../../../models/v1/participant');

module.exports = {

    get : function (req, res, next) {
        ParticipantModel
            .findOne({ email : req.body.email, cpf: req.body.cpf })
            .select('-_id')
            .exec(function (err, participant) {
                if (err) {
                    return res.status(500).json(err);
                }

                return res.status(200).json(participant)
            });
    }

}