import { Component } from "react";
import Taro, { chooseMedia } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { detectFace } from "@/service/api";
import { readFile } from "@/utils/index";
import "./index.scss";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
        if (data) {
          detectFace({ Image: data });
        }
      },
    });
  }

  render() {
    return (
      <View className="index">
        <Button type="primary" onClick={this.handleClick}>
          按钮
        </Button>
      </View>
    );
  }
}
