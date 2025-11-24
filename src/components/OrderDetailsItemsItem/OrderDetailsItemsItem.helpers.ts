import * as Yup from 'yup';

export const validationSchema = Yup.object({
  clipRef: Yup.object({
    name: Yup.string().required('Clip reference is required'),
    masterClipId: Yup.string().nullable(),
    clipId: Yup.string().nullable(),
  }).required('Clip reference is required'),
  timecodeIn: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode In is required'),
  timecodeOut: Yup.string()
    .matches(/^\d{2}:\d{2}:\d{2}:\d{2}$/, 'Use hh:mm:ss:ff')
    .required('Timecode Out is required'),
});
