// @flow
import QcloudSms from 'qcloudsms_js';

// Doc: https://github.com/qcloudsms/qcloudsms_js

type Opts = {
  appid: string,
  appkey: string,
}

export class Qcloud {
  ssender: any;

  constructor({appid, appkey}: Opts = {}) {
    const qcloudsms = QcloudSms(appid, appkey);
    this.ssender = qcloudsms.SmsSingleSender();
  }

  async sendVCodeSMS(countryCode: number, phoneNumber: string, vCode: string, ttl: string) {
    // This template is
    // [IoTeX] 您的验证码是{1}, 有效时间是{2}
    // let @qevan know if you need to change the template or apply for a new one.
    const templateId = 121073;
    const smsSign = 'IoTeX';

    return new Promise(((resolve, reject) => {
      this.ssender.sendWithParam(countryCode, phoneNumber, templateId, [vCode, ttl], smsSign, '', '', (err, _, resData) => {
        if (err) {
          return reject(err);
        }
        resolve(resData);
      });
    }));
  }
}
