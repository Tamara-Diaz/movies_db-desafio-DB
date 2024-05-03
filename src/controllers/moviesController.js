const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

module.exports = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: (req, res) => {
        res.render('moviesAdd')
    },
    create: (req, res) => {
        const { validationResult } = require('express-validator')
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const { title, rating, awards, release_date, length } = req.body
            db.Movie.create({
                title: title,
                rating: rating,
                length: length,
                awards: awards,
                release_date: release_date,
            })
            .then(() => {
                res.redirect('/movies')
            }) 
            .catch((err) => {
                res.send(err.message)
            })
        } else {
            return res.render('moviesAdd', {
                old: req.body,
                errors: errors.mapped()
            });
        }
        
    },
    edit: (req, res) => {
        const { id } = req.params
        db.Movie.findByPk(id)
        .then(Movie =>
            res.render('moviesEdit', { Movie })
        )
        .catch((err) => {
            res.send(err)
        })
    },
    update: (req,res) => {
        const { validationResult } = require('express-validator')
        const errors = validationResult(req);
        if(errors.isEmpty()) {
            const { id } = req.params
            const { title, rating, length, awards, release_date} = req.body
            db.Movie.update(
                {
                    title: title,
                    rating: rating,
                    length: length,
                    awards: awards,
                    release_date: release_date
                },
                {
                    where: { id: id }
                })
                .then((Movie) => {
                    res.redirect('/movies');
                })
                .catch((err) => {
                    res.send(err.message)
                }
            )
        } else {
            return res.render('moviesEdit', {
                old: req.body,
                id: req.params.id,
                errors: errors.mapped()
            });
        }
        
    },
    delete: (req, res) => {
        const { id } = req.params;
        db.Movie.findByPk(id)
        .then(Movie => {
            res.render('moviesDelete', { Movie })
        })
        .catch((err) => {
            res.send(err.message)
        })
    },
    destroy: (req, res) => {
        const { id } = req.params
        db.Movie.destroy({
            where: {id: id}
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            res.send(err.message)
        })
    }
};