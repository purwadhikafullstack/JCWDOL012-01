import * as Yup from 'yup';

export const validateNewEvent = Yup.object({
  name: Yup.string()
    .max(30, 'Must be 30 letters or less')
    .required('Name event is required'),
});

export const imageSchema = Yup.mixed()
  .required('File gambar harus diunggah')
  .test(
    'fileType',
    'Jenis file harus dalam jpeg, jpg atau png',
    (value: any) => {
      if (!value) return true;
      const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
      return supportedFormats.includes(value.type);
    },
  )
  .test('fileSize', 'Ukuran file tidak boleh lebih dari 1MB', (value: any) => {
    if (!value) return true;
    return value.size <= 1024 * 1024;
  });
