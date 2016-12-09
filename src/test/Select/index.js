import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import Select from '../../components/Select'

class TestSelect extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            options: [{
                name: "北京",
                selected: true,
                value: '北京'
            },{
                name: "上海",
                value: '上海'
            },{
                name: "广州",
                value: '广州'
            },{
                name: "深圳",
                value: '深圳'
            },{
                name: "成都",
                value: '成都'
            },{
                name: "武汉",
                value: '武汉'
            }],
            multipleOptions: [{
                name: "北京",
                selected: true,
                value: '北京'
            },{
                name: "上海",
                value: '上海'
            },{
                name: "广州",
                selected: true,
                value: '广州'
            },{
                name: "深圳",
                selected: true,
                value: '深圳'
            },{
                name: "成都",
                selected: true,
                value: '成都'
            },{
                name: "武汉",
                value: '武汉'
            }]
        }
    }
    render() {
        return (
            <div>
                <Select options={this.state.options}></Select>
                <Select options={this.state.multipleOptions} multiple="true"></Select>
            </div>
        )
    }
}

export default TestSelect
