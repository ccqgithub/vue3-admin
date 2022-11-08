import { createForm } from 'vfm';

const getForm = () => {
  return createForm<{
    name: string;
    countryCode: string;
    cityCode: string;
    countryName: string;
    cityName: string;
  }>({
    initValues: {
      // general
      name: '',
      countryCode: 'CN',
      cityCode: 'CN-SH',
      countryName: '',
      cityName: ''
    }
  });
};

export { getForm };
