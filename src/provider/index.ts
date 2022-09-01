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
}
