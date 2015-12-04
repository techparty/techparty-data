/*jslint node: true */

'use strict';

var request = require('request');
var mongoose = require('../config/mongoose');
var SpeakerModel = require('../app/models/v1/speaker');

var speakers = [];

speakers.push({
    name: 'Everton Luís Berz',
    talk: 'Tecnologia da Informação na Administração Pública',
    date: '04/06/2015',
    year: 2015
});

speakers.push({
    name: 'Rodrigo Nascimento',
    talk: 'MeteorJS: Como funciona e como começar',
    date: '04/06/2015',
    year: 2015
});

speakers.push({
    name: 'Rafael Eyng',
    talk: "Uma introdução ao GitHub",
    date: '04/07/2015',
    year: 2015
});

speakers.push({
    name: 'Marlon Bernardes',
    talk: "Uma introdução ao GitHub",
    date: '04/07/2015',
    year: 2015
});

speakers.push({
    name: 'Rodrigo Barros',
    talk: 'Legado é mais importante que dinheiro',
    date: '04/07/2015',
    year: 2015
});

speakers.push({
    name: 'Eduardo Brandes',
    talk: "The Business Intelligence's Toolbox",
    date: '04/08/2015',
    year: 2015
});

speakers.push({
    name: 'Marcus Sá',
    talk: 'Growth hacking, conquistando seus primeiros usuários',
    date: '04/08/2015',
    year: 2015
});

speakers.push({
    name: 'Leonardo Augusto Sápiras',
    talk: 'Mineração de Opiniões na WEB',
    date: '04/09/2015',
    year: 2015
});

speakers.push({
    name: 'Gabriel Bender',
    talk: "UX e Desenvolvedores: Projetando o Óbvio",
    date: '04/09/2015',
    year: 2015
});

speakers.push({
    name: 'Cícero Raupp Rolim',
    talk: "O Bode vai pro espaço!",
    date: '04/10/2015',
    minutes: 100,
    year: 2015
});

speakers.push({
    name: 'Paulo Bridi',
    talk: "O Bode vai pro espaço!",
    date: '04/10/2015',
    minutes: 100,
    year: 2015
});

speakers.push({
    name: 'Santiago Andreuzza',
    talk: "O Bode vai pro espaço!",
    date: '04/10/2015',
    minutes: 100,
    year: 2015
});

speakers.push({
    name: 'Fernando Porazzi',
    talk: 'CSS3 Media Queries',
    date: '03/31/2014',
    year: 2014
});

speakers.push({
    name: 'Cícero Raupp Rolim',
    talk: 'Do Cabrito ao Bode',
    date: '03/31/2014',
    year: 2014
});

speakers.push({
    name: 'Paulo Bridi',
    talk: "Do Cabrito ao Bode",
    date: '03/31/2014',
    year: 2014
});

speakers.push({
    name: 'Santiago Andreuzza',
    talk: "Do Cabrito ao Bode",
    date: '03/31/2014',
    year: 2014
});

speakers.push({
    name: 'Lauro Becker',
    talk: 'Versatilidade, negócios e nerdices',
    date: '03/31/2014',
    year: 2014
});

speakers.push({
    name: 'Mauricio Baum Jr.',
    talk: 'Overview AngularJS + Ruby on Rails',
    date: '04/01/2014',
    year: 2014
});

speakers.push({
    name: 'Juliano Selli',
    talk: 'O que é experiência do usuário?',
    date: '04/02/2014',
    year: 2014
});

speakers.push({
    name: 'Leonardo Dalmina',
    talk: 'Criando Jogos 2D com Lua + Corona SDK',
    date: '04/02/2014',
    year: 2014
});

speakers.push({
    name: 'Rafael Kellermann Streit',
    talk: 'Como começar a desenvolver para iOS',
    date: '04/03/2014',
    year: 2014
});

speakers.push({
    name: 'Rodrigo Krummenauer',
    talk: 'The MEAN Stack: MongoDB, ExpressJS, AngularJS and Node.js',
    date: '04/03/2014',
    year: 2014
});

speakers.push({
    name: 'Giovani Facchini',
    talk: 'Performance Engineering in a Nutshell',
    date: '04/04/2014',
    year: 2014
});

speakers.push({
    name: 'Maiko Gabriel Kinzel Engelke',
    talk: 'Web e a criação de Jogos',
    date: '04/04/2014',
    year: 2014
});

SpeakerModel.create(speakers, function (err) {
    if (err)
        return console.log(err);

    console.log('POPULATE OK');
});