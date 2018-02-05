import AppConstants from '../constant/App.constant';

class FetchUtil {
  static uploadImage(isTagger, name, base64Url, callback) {
    if (typeof name === 'undefined') {
      return;
    }

    const img = {
      name,
      base64Url,
    };

    fetch(AppConstants.SEVER_URL + (isTagger ?
      AppConstants.SERVER_ROUTE.POST.IMAGE.TAGGER :
      AppConstants.SERVER_ROUTE.POST.IMAGE.FACE), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(img),
    }).then(res => res.json())
      .then((resJson) => {
        console.log(resJson);
        callback();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static getImageArr(isTagger, callback) {
    fetch(AppConstants.SEVER_URL + (isTagger ?
      AppConstants.SERVER_ROUTE.GET.RECORDS.TAGGER :
      AppConstants.SERVER_ROUTE.GET.RECORDS.FACE), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((resJson) => {
        const { records } = resJson;
        records.forEach((record, idx) => {
          records[idx].key = idx;
        });
        callback(records);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default FetchUtil;
