import { OSSProvider, Uploader, UploadResult } from './index';
import fs from 'fs';

describe('TencentCloudCOS', () => {
  let uploader: Uploader;

  beforeAll(() => {
    uploader = new Uploader({
      provider: OSSProvider.TencentCloudCOS,
      endpoint: 'cos.${region}.myqcloud.com',
      region: 'ap-guangzhou',
      bucket: 'bucketname-with-appid',
      credential: {
        secretId: '-',
        secretKey: '-',
      },
      prefix: '/abb',
    });
  });
  it('upload prefix should be correct', async () => {
    let res: UploadResult = await uploader.upload({ body: fs.readFileSync('tsconfig.json'), mime: 'application/json' });
    expect(res.uri).toMatch(/^abb\//);
  });
  it('upload uri should be correct', async () => {
    let res: UploadResult = await uploader.upload(
      { body: fs.readFileSync('tsconfig.json'), mime: 'application/json' },
      'something'
    );
    expect(res.uri).toEqual('abb/something.json');
  });
});

describe('S3', () => {
  let uploader: Uploader;

  beforeAll(() => {
    uploader = new Uploader({
      provider: OSSProvider.S3,
      endpoint: 's3.${region}.amazonaws.com',
      bucket: 'bucketName',
      credential: {
        secretId: '-',
        secretKey: '-',
      },
      prefix: '/afaf',
    });
  });
  it('upload prefix should be correct', async () => {
    let res: UploadResult = await uploader.upload({ body: fs.readFileSync('tsconfig.json'), mime: 'application/json' });
    expect(res.uri).toMatch(/^afaf\//);
  });
  it('upload uri should be correct', async () => {
    let res: UploadResult = await uploader.upload(
      { body: fs.readFileSync('tsconfig.json'), mime: 'application/json' },
      'something'
    );
    expect(res.uri).toEqual('afaf/something.json');
  });
});
