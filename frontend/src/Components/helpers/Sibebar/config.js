import * as Yup from 'yup';

export const initialValues = {
    search: ''
};

export const getValidationSchema = () => Yup.object().shape({
    search: Yup.string().min(3, 'Please provide at least 3 characters'),
});