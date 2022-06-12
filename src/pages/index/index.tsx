import { Component } from "react";
import Taro, {
  chooseMedia,
  showToast,
  compressImage,
  getImageInfo,
} from "@tarojs/taro";
import { Button, Image } from "@tarojs/components";
import { detectFace } from "@/service/api";
import { readFile } from "@/utils/index";
import "./index.scss";

const emotionMap = {
  "0": "自然",
  "1": "高兴",
  "2": "惊讶",
  "3": "生气",
  "4": "悲伤",
  "5": "厌恶",
  "6": "害怕",
};

const glassMap = { "0": "无眼镜", "1": "普通眼镜", "2": "墨镜" };

const maskMap = { "0": "无口罩", "1": "有口罩" };
const noseMap = { "0": "朝天鼻", "1": "鹰钩鼻", "2": "普通", "3": "圆鼻头" };
const eyelidType = { "0": "单眼皮", "1": "双眼皮" };

interface State {
  file: any;
  faceInfo: any;
}

export default class Index extends Component<any, State> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: null,
      faceInfo: {},
    };
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick() {
    this.chooseImage();
  }

  chooseImage() {
    chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      maxDuration: 30,
      camera: "back",
      success: async (res: Taro.chooseMedia.SuccessCallbackResult) => {
        let file = res.tempFiles[0];
        console.log("tempFiles", res.tempFiles);
        if (file) {
          this.setState({
            file: file,
          });
          if (file.size > 1 * 1024 * 1024) {
            this.compressImage(file).then((compressFile) => {
              this.postImg(compressFile);
            });
          } else {
            this.postImg(file);
          }
        }
      },
    });
  }

  async postImg(file) {
    const data = await readFile(file);

    if (data) {
      detectFace({ Image: data })
        .then((res: any) => {
          console.log("detectFace", res);
          if (res?.FaceDetailInfos?.[0]) {
            this.setState({
              faceInfo: res.FaceDetailInfos[0].FaceDetailAttributesInfo,
            });
          }
        })
        .catch((e) => {
          showToast({
            title: e.message || "上传失败",
            icon: "error",
          });
        });
    }
  }

  compressImage(file) {
    let quality = ~~((50 * 1024 * 100) / file.size);
    return new Promise((resolve, reject) => {
      compressImage({
        src: file.tempFilePath, // 图片路径
        quality, // 压缩质量
        success: (res) => {
          resolve(res);
          this.setState({ file: res });
          console.log("compressImage", res, quality);
          getImageInfo({
            src: res.tempFilePath,
            success(res) {
              console.log("getImageInfo", res);
            },
          });
        },
        fail: (err) => {
          reject(err);
          console.log("compressImage", err);
        },
      });
    });
  }
  render() {
    const { faceInfo, file } = this.state;
    console.log("faceInfo", faceInfo);
    return (
      <view className="page-index">
        <view className="face-content">
          {file?.tempFilePath ? (
            <view className="face-box">
              <Image
                className="face-img"
                mode="aspectFit"
                src={file?.tempFilePath}
              ></Image>
            </view>
          ) : (
            <div className="face-tip">
              <p className="tip">
                上传一张完整的面部照片，AI智能测颜值评分系统就会根据国人的审美为你进行在线打分。除了颜值之外，测试结果还包含性别、年龄、面部表情等信息。
              </p>
              <i className="iconfont icon-face"></i>
            </div>
          )}
        </view>
        <view className="row-btn">
          <Button
            className="btn-upload"
            type="primary"
            onClick={this.handleClick}
          >
            <i className="iconfont icon-paizhao"></i>
            <text>选择照片</text>
          </Button>
        </view>
        <view className="result">
          <view className="result-title">分析结果</view>
          <view>魅力值: {faceInfo.Beauty}</view>
          <view>年龄: {faceInfo.Age}</view>
          <view>表情: {emotionMap[faceInfo.Emotion?.Type] || ""}</view>
          <view>微笑: {faceInfo.Smile || ""}</view>
          <view>鼻子: {noseMap[faceInfo.Nose?.Type] || ""}</view>
          <view>眼镜: {glassMap[faceInfo.Eye?.Glass?.Type] || ""}</view>
          <view>眼皮: {eyelidType[faceInfo.Eye?.EyelidType?.Type] || ""}</view>
          <view>帽子: {faceInfo.Hat?.Style?.Type == 1 ? "有" : "无"}</view>
          <view>口罩: {faceInfo.Mask?.Type == 1 ? "有口罩" : "无口罩"}</view>
        </view>
      </view>
    );
  }
}
