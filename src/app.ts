import { Component } from "react";
import "./assets/style/index.scss";

class App extends Component {
  componentDidMount() {
    console.log("app did mount env:", process.env.CONFIG);
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
