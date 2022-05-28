import Taro from "@tarojs/taro";

export function readFile(
  file,
  encoding: keyof Taro.FileSystemManager.Encoding = "base64"
) {
  const fs = Taro.getFileSystemManager();
  return new Promise((resolve, reject) => {
    fs.readFile({
      filePath: file.tempFilePath,
      encoding,
      position: 0,
      success(res) {
        resolve(res.data);
      },
      fail(res) {
        console.log("readfile fail:", res);
        reject(res);
      },
    });
  });
}
