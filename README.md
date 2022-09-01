# @lrvinye/oss-uploader

![Build Status](https://github.com/lrvinye/oss-uploader/actions/workflows/main.yml/badge.svg)
![publish-size](https://badgen.net/packagephobia/publish/@lrvinye/oss-uploader)
![publish-size](https://badgen.net/bundlephobia/minzip/@lrvinye/oss-uploader)
![release](https://badgen.net/github/release/lrvinye/oss-uploader)
![stars](https://badgen.net/github/stars/lrvinye/oss-uploader)
![package version](https://badgen.net/npm/v/@lrvinye/oss-uploader)
![downloads](https://badgen.net/npm/dt/@lrvinye/oss-uploader)
![node](https://badgen.net/npm/node/@lrvinye/oss-uploader)
![dependents](https://badgen.net/npm/dependents/@lrvinye/oss-uploader)
![license](https://badgen.net/npm/license/@lrvinye/oss-uploader)
![types](https://badgen.net/npm/types/@lrvinye/oss-uploader)

This a node package helps you to integrate multi-type object storage services into one line code.

### Usage

```
npm i @lrvinye/oss-uploader 
```

```ts
import { OSSProvider, Uploader, UploadResult } from '@lrvinye/oss-uploader';
const uploader = new Uploader({
  provider: OSSProvider.S3, // can be S3|COS
  endpoint: 's3.${region}.amazonaws.com',
  bucket: 'bucketName',
  credential: {
    secretId: '-',
    secretKey: '-',
  },
  prefix: '/images',
});
uploader
  .upload({body: fs.readFileSync("foo.jpg"), mime: "image/jpeg"})
  .then((res: UploadResult) => {
    console.log(res); // { uri: "images/VkbqGp6iKG3UbGgU.jpeg" }
  });
```

### Test

```
pnpm install 
```

```
pnpm test 
```
