import moviesRoute from './movies.route';

export default (app) => {
    app.use('/api/movies', moviesRoute);
};
