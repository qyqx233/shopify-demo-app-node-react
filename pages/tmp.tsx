// @ts-nocheck
import React, { createContext } from "react";

const { Provider, Consumer } = createContext("color"); // 创建 Context 引用 Provider 和 Consumer

class DeliverComponent extends React.Component {
    // 维护一个 state
    state = {
        color: 'orange',
        handleClick: () => {
            this.setState({ color: 'red' })
        }
    }
    render() {
        return (
            <Provider value={this.state}>
                <MidComponent />
            </Provider>
        )
    }
}

const MidComponent = () => <Receiver />; // 中间包含多层级的组件

const Receiver = () => ( // 需要使用的后代元素使用 Consumer
    <Consumer>
        {({ color, handleClick }) => <div style={{ color }} onClick={() => { handleClick() }}> Hello, this is receiver.</div>}
    </Consumer>
);

const App = () => <DeliverComponent />;

export default App;