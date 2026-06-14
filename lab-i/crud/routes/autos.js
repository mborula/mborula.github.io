var express = require('express');
var router = express.Router();

const db = require('../database');

router.get('/', function(req, res) {
    const autos = db.prepare(
        'SELECT * FROM auto'
    ).all();
    res.render('autos/index', { autos });
});

router.get('/create', function(req, res) {
    res.render('autos/create');
});

router.post('/create', function(req, res) {

    db.prepare(`
        INSERT INTO auto (name, year, price, description)
        VALUES (?, ?, ?, ?)
    `).run(req.body.name, req.body.year, req.body.price, req.body.description);

    res.redirect('/autos');
});

router.get('/:id', function(req, res) {

    const auto = db.prepare(
        'SELECT * FROM auto WHERE id=?'
    ).get(req.params.id);

    res.render('autos/show', { auto });
});

router.get('/:id/edit', function(req, res) {
    const auto = db.prepare(
        'SELECT * FROM auto WHERE id=?'
    ).get(req.params.id);
    res.render('autos/edit', { auto });
});
router.post('/:id/edit', function(req, res) {
    db.prepare(`
        UPDATE auto
        SET name=?, year=?, price=?, description=?
        WHERE id=?
    `).run(
        req.body.name,
        req.body.year,
        req.body.price,
        req.body.description,
        req.params.id
    );
    res.redirect('/autos');
});

router.post('/:id/delete', function(req, res) {

    db.prepare(
        'DELETE FROM auto WHERE id=?'
    ).run(req.params.id);

    res.redirect('/autos');
});

module.exports = router;