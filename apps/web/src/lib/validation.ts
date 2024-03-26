import * as Yup from 'yup';

export const validateNewEvent = Yup.object({
  name: Yup.string()
  .max(30, 'Must be 30 letters or less')
  .required('Name event is required'),
})