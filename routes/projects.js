var express = require('express');
var router = express.Router();
var Project = require('../models/projects.js');
var _und = require('underscore');

router.get('/index', function(req, res, next) {
	Project.find({}).exec(function (err, projects) {
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
		}
		var list = _und.sortBy( projects, 'name' );
		return res.render('projects/index', { title: 'Projetos', projects: list });
	});
});

router.get('/new', function(req, res, next) {
	return res.render('projects/new', { title: 'Novo Projeto' });
});


router.get('/edit/:id', function(req, res, next) {
	Project.findById(req.params.id).exec(function (err, proj) {
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
		}
		return res.render('projects/edit', { title: 'Atualizar Projeto', project: proj });
	});
});

router.get('/show/:id', function(req, res, next) {
	Project.findById(req.params.id).exec(function (err, proj) {
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
		}
		return res.render('projects/show', { title: 'Visualizar Projeto', proj: proj });
	});
});

router.post('/create',  function(req, res, next) {
	Project.create(req.body, function(err, usr){
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
        }
		return res.redirect('/projects/index');
	});
});

router.post('/update',  function(req, res, next) {
	Project.findByIdAndUpdate({_id: req.body._id}, req.body, function(err, usr){
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
		}
		return res.redirect('/projects/index');
	});
});

router.get('/delete/:id',  function(req, res, next) {
	Project.find({_id: req.params.id}).remove(function(err, proj){
		if(err){
			console.log(JSON.stringify(err));
			return next(err);
		}
		return res.redirect('/projects/index');
	});
});

module.exports = router;