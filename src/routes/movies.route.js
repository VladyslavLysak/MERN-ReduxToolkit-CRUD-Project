import Router from 'express-promise-router';
import {
    getMovie,
    getAllMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    deleteActor
} from '../controllers/movies.controller';

const router = Router();

router.get("/:id", getMovie);
router.put("/:id", updateMovie);
router.get("/", getAllMovies);
router.post("/addMovie", createMovie);
router.delete("/:id", deleteMovie);
router.put("/actor/:id", deleteActor);

export default router;