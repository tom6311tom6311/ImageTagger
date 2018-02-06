const AppConstants = {
  SEVER_URL: 'http://localhost:3000/',
  SERVER_ROUTE: {
    POST: {
      IMAGE: {
        TAGGER: 'image/tagger/',
        FACE: 'image/face/',
      },
    },
    GET: {
      IMAGES: {
        TAGGER: 'images/tagger/',
        FACE: 'images/face/',
      },
      RECORDS: {
        TAGGER: 'records/tagger/',
        FACE: 'records/face/',
      },
    },
  },
  TEXT_UPLOADING: 'Uploading',
  MAX_LOADING_TIME: 15000,
  TOAST_DURATION: 3000,
};

export default AppConstants;
