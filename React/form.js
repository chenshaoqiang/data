//if(module.hot)
//    module.hot.accept();
'use strict';
//import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import './css/index.css';

class Checkboxes extends Component {
    render(){
        return <span>
          A
          <input onChange={this.props.handleCheck}  name="goodCheckbox" type="checkbox" value="A"/>
          B
          <input onChange={this.props.handleCheck} name="goodCheckbox" type="checkbox" value="B" />
          C
          <input onChange={this.props.handleCheck} name="goodCheckbox" type="checkbox" value="C" />
      </span>
    }
}

export default Checkboxes;
class RadioButtons extends Component {
    saySomething(){
        alert("我是一个很棒的单选框按钮组");
    }
    render(){
        return <span>
          A
          <input onChange={this.props.handleRadio} name="goodRadio" type="radio" value="A"/>
          B
          <input onChange={this.props.handleRadio} name="goodRadio" type="radio" defaultChecked value="B"/>
          C
          <input onChange={this.props.handleRadio} name="goodRadio" type="radio" value="C"/>
      </span>
    }
}

export default RadioButtons;
class FormApp extends Component {

    state = {
        inputValue: '请输入...',
        selectValue: 'A',
        radioValue:'B',
        checkValues:[],
        textareaValue:'请输入...'
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let formData = {
            input: this.refs.goodInput.value,
            select: this.refs.goodSelect.value,
            textarea: this.refs.goodTextarea.value,
            radio: this.state.radioValue,
            check: this.state.checkValues
        };

        alert('您即将提交表单');
        console.log('你提交的数据是:');
        console.log(formData);

    };

    handleRadio = (e) => {
        this.setState({
            radioValue: e.target.value
        })
    };

    handleCheck = (e) => {
        let checkValues = this.state.checkValues.slice();
        let newVal = e.target.value;
        let index = checkValues.indexOf(newVal);

        if( index == -1 ){
            checkValues.push( newVal )
        }else{
            checkValues.splice(index,1);
        }

        this.setState({
            checkValues: checkValues
        })
    };

    render(){
        return <form onSubmit={this.handleSubmit}>
            <h3> 请输入内容 </h3>
            <input ref="goodInput" type="text" defaultValue={this.state.inputValue }/>
            <br/>

            <h3> 请选择 </h3>
            <select defaultValue={ this.state.selectValue } ref="goodSelect">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
            </select>
            <br/>

            <h3> 单项选择 </h3>
            <RadioButtons ref="goodRadio" handleRadio={this.handleRadio} />
            <br/>

            <h3> 多选按钮 </h3>
            <Checkboxes handleCheck={this.handleCheck} />
            <br/>

            <h3> 反馈建议 </h3>
            <textarea defaultValue={this.state.textareaValue} ref="goodTextarea"></textarea>
            <br/>

            <button type="submit">确认提交</button>
        </form>
    }
}

export default FormApp;
/*class HandleDOMComponent extends Component {
    //获取真正的DOM节点
    componentDidMount(){
        // 两种方式都可以获取到元素
        let ele = findDOMNode(this.refs.content);
        let ele2 = this.refs.content;
        // 如果想用 jquery，那么这是个好时机
        console.log( ele );
        console.log( ele.innerHTML );
        console.log( ele2.innerHTML );
    }
    render(){
        return (
            <div>
                <h3>来吧，一起操作DOM</h3>
                <div ref='content'>这是DOM元素里面的内容</div>
                <textarea name="description" value="This is a description." />
            </div>
        );
    }
}
export default HandleDOMComponent;*/
/*class NavComponent extends Component {
    state = {
        destroyed:false
    };
    destroy = () => {
        this.setState({
            destroyed: true
        });
    };
    render() {
        var navstyles={
            width:'100%',
            height:'50px',
            background:'gold'
        };
        if(this.state.destroyed){
            return null;
        }
        return <nav style={navstyles}>
            <p>
                <button>每次加111</button>
                <button onClick={this.destroy}>干掉这两个按钮222</button>
            </p>
        </nav>;
    }
}
export default NavComponent;*/
ReactDOM.render(<FormApp />, document.getElementById('app'));