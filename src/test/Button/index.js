import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import Button from '../../components/Button'
class TestButton extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: '20px'}}>
                    <Button className="demo-Button" type="">默认</Button>
                    <Button className="demo-Button" type="primary">主要</Button>
                    <Button className="demo-Button" type="info">信息</Button>
                    <Button className="demo-Button" type="succ">成功</Button>
                    <Button className="demo-Button" type="warn">警告</Button>
                    <Button className="demo-Button" type="error">错误</Button>
                </div>
                <div style={{marginTop: '20px'}}>
                    <Button className="demo-Button" type="" size="large">默认</Button>
                    <Button className="demo-Button" type="primary" size="large">主要</Button>
                    <Button className="demo-Button" type="info" size="large">信息</Button>
                    <Button className="demo-Button" type="succ" size="large">成功</Button>
                    <Button className="demo-Button" type="warn" size="large">警告</Button>
                    <Button className="demo-Button" type="error" size="large">错误</Button>
                </div>
                <div style={{marginTop: '20px'}}>
                    <Button className="demo-Button" type="" size="small">默认</Button>
                    <Button className="demo-Button" type="primary" size="small">主要</Button>
                    <Button className="demo-Button" type="info" size="small">信息</Button>
                    <Button className="demo-Button" type="succ" size="small">成功</Button>
                    <Button className="demo-Button" type="warn" size="small">警告</Button>
                    <Button className="demo-Button" type="error" size="small">错误</Button>
                </div>
            </div>
        )
    }
}

export default TestButton
