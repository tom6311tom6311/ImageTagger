import AppConstants from '../../../constant/App.constant';

class TaggerUtil {
  static uploadImage(name, base64Url, callback) {
    if (typeof name === 'undefined') {
      return;
    }

    const img = {
      name,
      base64Url,
    };

    console.log('Uploading...');
    fetch(AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.POST.IMAGE, {
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

  static getImageArr(callback) {
    fetch(AppConstants.SEVER_URL + AppConstants.SERVER_ROUTE.GET.RECORDS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((resJson) => {
        const { records } = resJson;
        console.log(resJson.records);
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

export default TaggerUtil;
