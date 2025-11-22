import * as Yup from 'yup';

export const validationSchema = Yup.object({
  clipRef: Yup.string().required('Clip reference is required'),
  timecodeIn: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode In is required'),
  timecodeOut: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode Out is required'),
});
