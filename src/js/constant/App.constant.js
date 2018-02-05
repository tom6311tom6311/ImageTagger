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
  API_URL: {
    AZURE: {
      FACE_DETECT: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect',
    },
  },
  API_KEY: {
    AZURE: {
      FACE_DETECT: [
        'f2810df90a854650bd4a7d148f708198',
        'b7c2af713a8b4b4f816532ee2facff11',
      ],
    },
  },
  MAX_LOADING_TIME: 10000,
};

export default AppConstants;
