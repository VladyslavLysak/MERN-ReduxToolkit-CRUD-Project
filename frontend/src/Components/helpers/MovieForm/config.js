import * as Yup from 'yup';
import moment from 'moment';

export const initialValues = {
    title: '',
    release: '',
    format: 'VHS',
    actors: [{ name: '', surname: '' }]
};

const year = Number(moment().format('YYYY'));

export const getValidationSchema = () => Yup.object().shape({
    title: Yup.string().required('Title is required'),
    release: Yup.number()
        .typeError('Release must be a number')
        .min(1930, 'Realse must be less than 1930')
        .max(year, `Realse cannot be greater then ${year}`)
        .required('Release is required'),
    actors: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
            surname: Yup.string().required('Surname is required'),
        })
    )
});