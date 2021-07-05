import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    title: { type: String, required: true },
    release: { type: Number, required: true },
    format: {
        type: String,
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        default: 'VHS'
    },
    actors: [
        {
            name: { type: String, required: true },
            surname: { type: String, required: true }
        }
    ]
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;