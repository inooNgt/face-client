import { Component } from "react";
import Taro, {
  chooseMedia,
  showToast,
  compressImage,
  getImageInfo,
} from "@tarojs/taro";
import { Button, Image } from "@tarojs/components";
import { getStockIndex, getStockWeight } from "@/service/akt";
import { readFile } from "@/utils/index";
import "./index.scss";

interface State {
  file: any;
  stockList: any[];
  columns: any[];
}

export default class Index extends Component<any, State> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getStockInfo = this.getStockInfo.bind(this);
    this.state = {
      file: null,
      stockList: [],
      columns: [
        { title: "指数名称", key: "" },
        { title: "最新价", key: "" },
        { title: "涨跌幅", key: "" },
      ],
    };
  }
  componentWillMount() {}

  componentDidMount() {
    getStockIndex()
      .then((res: any) => {
        console.log("getStockIndex", res);
        this.setState({
          stockList: res,
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick() {}

  getStockInfo(item: any) {
    console.log("getinfo:", item);
    getStockWeight(item["代码"].replace?.(/(sh|sz)/g, ""))
      .then((res) => {
        console.log("getStockWeight", res);
      })
      .catch((e) => {
        console.log("err", e);
      });
  }

  render() {
    let { stockList, columns } = this.state;
    return (
      <div className="page-stock table">
        <div className="table-head">
          {columns.map((item) => (
            <span className="table-cell" key={item.title}>
              {item.title}
            </span>
          ))}
        </div>
        <div className="table-body">
          {stockList.map((item, index) => (
            <div
              className="table-row"
              key={index}
              onClick={() => this.getStockInfo(item)}
            >
              <span className="table-cell stock-name">{item["名称"]}</span>
              <span className="table-cell stock-info">{item["最新价"]}</span>
              <span className="table-cell stock-info">{item["涨跌幅"]}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
