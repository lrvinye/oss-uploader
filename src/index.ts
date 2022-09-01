import { generateRandomName } from './key';
import { getExtension } from 'mime';
import { S3Client } from './provider/s3';
import { TencentCloudCOSClient } from './provider/cos';

export interface StorageObject {
  body: Buffer;
  mime: string;
}

export interface UploadResult {
  uri: string;
}

export enum OSSProvider {
  S3 = 's3',
  TencentCloudCOS = 'tencent-cloud-cos',
}

export interface UploaderConfig {
  provider: OSSProvider;
  endpoint: string;
  region?: string;
  bucket: string;
  credential: {
    secretId?: string;
    secretKey?: string;
  };
  prefix?: string;
}

export class Uploader {
  private config: UploaderConfig;
  private s3Client?: S3Client;
  private tencentCloudCOSClient?: TencentCloudCOSClient;

  constructor(cfg: UploaderConfig) {
    this.config = { ...cfg };
    switch (cfg.provider) {
      case OSSProvider.S3:
        this.s3Client = new S3Client({ ...cfg });
        break;
      case OSSProvider.TencentCloudCOS:
        this.tencentCloudCOSClient = new TencentCloudCOSClient({ ...cfg });
        break;
    }
  }

  async upload(
    obj: StorageObject,
    name: string = generateRandomName()
  ): Promise<UploadResult> {
    const ext = getExtension(obj.mime) ?? '';
    let prefix = (this.config.prefix ?? '').trim();
    // remove start char '/', key should not start with '/'
    if (/^\/.*/.test(prefix)) {
      prefix = prefix.replace('/', '');
    }
    // should end with '/'
    if (!/.+\/$/.test(prefix)) {
      prefix = prefix.concat('/');
    }
    const key = `${
      name.startsWith('/') ? name.replace('/', '') : name
    }.${ext.toLowerCase()}`;
    const uri = prefix.concat(key);
    const params = {
      obj,
      key: uri,
    };
    console.debug(`[OSS-Uploader] before upload`, {
      mime: obj.mime,
      name,
      key,
      ext,
      prefix,
      uri,
    });
    switch (this.config.provider) {
      case OSSProvider.S3:
        await this.s3Client!.putObject(params);
        break;
      case OSSProvider.TencentCloudCOS:
        await this.tencentCloudCOSClient!.putObject(params);
        break;
    }
    return { uri };
  }
}
