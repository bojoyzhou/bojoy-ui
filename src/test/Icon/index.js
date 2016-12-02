import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import Icon from '../../components/Icon'
class TestIcon extends Component {
    render() {
        return (
            <div>
                <Icon className="demo-icon">&#xE869;</Icon>构建
                <Icon className="demo-icon">save</Icon>保存
                <Icon className="demo-icon">add</Icon>添加
                <Icon className="demo-icon">person</Icon>用户
                <Icon className="demo-icon">edit</Icon>编辑
                <Icon className="demo-icon">delete</Icon>删除
            </div>
        )
    }
}

export default TestIcon
