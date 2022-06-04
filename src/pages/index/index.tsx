import { Component } from "react";
import Taro, { chooseMedia } from "@tarojs/taro";
import { Button } from "@tarojs/components";
import { detectFace } from "@/service/api";
import { readFile } from "@/utils/index";
import "./index.scss";

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
        console.log(res.tempFiles);
        const data = await readFile(res.tempFiles[0]);
        this.setState({
          file: res.tempFiles[0],
        });
        if (data) {
          detectFace({ Image: data }).then((res: any) => {
            console.log("detectFace", res);
            if (res?.FaceDetailInfos?.[0]) {
              this.setState({
                faceInfo: res.FaceDetailInfos[0].FaceDetailAttributesInfo,
              });
            }
          });
        }
      },
    });
  }

  render() {
    const { faceInfo, file } = this.state;
    console.log("faceInfo", faceInfo);
    return (
      <view className="page-index">
        <view className="face-box">
          {file?.tempFilePath ? (
            <img className="face-img" src={file?.tempFilePath}></img>
          ) : (
            <i className="iconfont icon-face"></i>
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
        <view>
          <view>Age:{faceInfo.Age}</view>
          <view>Beauty:{faceInfo.Beauty}</view>
        </view>
      </view>
    );
  }
}
