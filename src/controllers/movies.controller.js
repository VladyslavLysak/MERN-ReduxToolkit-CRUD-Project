import MoviesModel from '../models/movies.model';

export const getMovie = async (req, res) => {
    const movieId = req.params.id;
    const movie = await MoviesModel.findOne({ _id: movieId });
    if (!movie) {
        return res.status(422).json({
            error: 'Movie does not exist',
        });
    }
    res.json({ movie, success: true, status: 200 });
}

export const getAllMovies = async (req, res) => {
    const movies = await MoviesModel.find();
    res.json({ movies, success: true, status: 200 });
}

export const createMovie = async (req, res) => {
    const newMovie = new MoviesModel(req.body);
    const oldMovie = await MoviesModel.findOne({ title: req.body.title });
    if (oldMovie) {
        return res.status(422).json({
            error: 'Movie with this title already exists',
        });
    }
    await newMovie.save();
    res.json({ newMovie, success: true, status: 200 })
}

export const deleteMovie = async (req, res) => {
    const movieId = req.params.id;
    const movie = await MoviesModel.findOne({ _id: movieId });
    if (!movie) {
        return res.status(422).json({
            error: 'Movie does not exist',
        });
    }
    await MoviesModel.findOneAndDelete({ _id: movieId });
    res.json({ message: 'Movie has been deleted', movie: movie, success: true, status: 200 });
}

export const updateMovie = async (req, res) => {
    const movieId = req.params.id;
    const newMovie = req.body;
    await MoviesModel.findOneAndUpdate({ _id: movieId }, newMovie);
    res.json({ movie: newMovie, success: true, status: 200 });
}

export const deleteActor = async (req, res) => {
    const movieId = req.params.id;
    const deletedActor = req.body;
    await MoviesModel.findOneAndUpdate({ _id: movieId }, {
        "$pull": { "actors": { "_id": deletedActor._id } }
    });
    const newMovie = await MoviesModel.findOne({ _id: movieId });
    res.json({ movie: newMovie, success: true, status: 200 });
}