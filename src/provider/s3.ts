import AWS from 'aws-sdk';
import { StorageObject, UploaderConfig } from '../index';
import { Provider } from './index';

export class S3Client
  extends Provider.AbstractClient
  implements Provider.IClient
{
  client: AWS.S3;

  constructor(cfg: UploaderConfig) {
    super(cfg);
    this.client = new AWS.S3({
      accessKeyId: cfg.credential.secretId,
      secretAccessKey: cfg.credential.secretKey,
      endpoint: cfg.endpoint,
    });
  }

  async putObject({ obj, key }: { obj: StorageObject; key: string }) {
    let result;
    try {
      result = await new Promise((resolve, reject) =>
        this.client.upload(
          {
            Bucket: this.config.bucket,
            Key: key,
            Body: obj.body,
            ContentType: obj.mime,
          },
          (err, data) => {
            err && reject(err);
            resolve(data);
          }
        )
      );
      console.info(`[S3 upload] success`, { result });
    } catch (err) {
      console.warn(`[S3 upload] error`, { result, error: err });
      throw err;
    }
  }
}
