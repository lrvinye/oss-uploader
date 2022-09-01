import { S3Client } from './s3';
import { StorageObject, UploaderConfig } from '../index';

export namespace Provider {
  export class AbstractClient {
    config: UploaderConfig;

    constructor(cfg: UploaderConfig) {
      this.config = cfg;
    }
  }

  export interface IClient {
    putObject(params: { obj: StorageObject; key: string }): Promise<void>;
  }

  export namespace Client {
    export const S3 = S3Client;
  }
}
