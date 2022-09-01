# @lrvinye/oss-uploader

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
