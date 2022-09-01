import { StorageObject, UploaderConfig } from '../index';
import { Provider } from './index';

const COS = require('cos-nodejs-sdk-v5');

export class TencentCloudCOSClient extends Provider.AbstractClient implements Provider.IClient {
  client: typeof COS;

  constructor(cfg: UploaderConfig) {
    super(cfg);
    this.client = new COS({
      SecretId: cfg.credential.secretId,
      SecretKey: cfg.credential.secretKey,
    });
  }

  async putObject({ obj, key }: { obj: StorageObject; key: string }) {
    let result;
    try {
      result = await this.client.putObject({
        Region: this.config.region,
        Body: obj.body,
        ContentType: obj.mime,
        Bucket: this.config.bucket,
        Key: key,
      });
      console.info(`[TencentCloudCOS upload] success`, { result });
    } catch (err) {
      console.warn(`[TencentCloudCOS upload] error`, { result, error: err });
      throw err;
    }
  }
}
