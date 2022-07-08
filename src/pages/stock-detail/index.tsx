import { Component } from "react";
import { showToast, getCurrentInstance } from "@tarojs/taro";
import { getStockWeight } from "@/service/akt";
import "./index.scss";

interface State {
  file: any;
  list: any[];
  columns: any[];
}

export default class Index extends Component<any, State> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: null,
      list: [],
      columns: [
        { title: "交易所", key: "" },
        { title: "成分券名称", key: "" },
        { title: "权重", key: "" },
      ],
    };
  }
  componentWillMount() {
    const router = getCurrentInstance().router;
    console.log("router", router);
    getStockWeight(router?.params?.code)
      .then((res: any) => {
        console.log("getStockWeight", res);
        this.setState({
          list: res,
        });
      })
      .catch((e) => {
        console.log("err", e);
      });
  }

  componentDidMount() {}

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
    let { list, columns } = this.state;
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
          {list.map((item, index) => (
            <div
              className="table-row"
              key={index}
              onClick={() => this.getStockInfo(item)}
            >
              <span className="table-cell stock-name">{item["交易所"]}</span>
              <span className="table-cell stock-name">
                {item["成分券名称"]}
              </span>
              <span className="table-cell stock-info">
                {(item["权重"] * 100).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
