import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import {Menu, Item, Sub} from '../../components/Menu'
class TestMenu extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeKey:"3"
        }
        this.onChange=this.onChange.bind(this)
    }
    onChange(key){
        console.log('key', key)
        this.setState(Object.assign({}, this.state,{
            activeKey:key
        }))
    }
    render() {
        return (
            <div>
                <Menu activeKey={this.state.activeKey} style={{width: '250px'}}>
                    <Item data-key="1">hahahah</Item>
                    <Item data-key="2">hahahah</Item>
                    <Sub title={'Sub'}>
                        <Item data-key="3">hahahah</Item>
                        <Item data-key="4">hahahah</Item>
                    </Sub>
                    <Sub title={'Sub'}>
                        <Item data-key="5">hahahah</Item>
                        <Item data-key="6">hahahah</Item>
                    </Sub>
                    <Sub title={'Sub'}>
                        <Item data-key="7">hahahah</Item>
                        <Item data-key="8">hahahah</Item>
                        <Sub title={'Sub'}>
                            <Item data-key="9">hahahah</Item>
                            <Item data-key="10">hahahah</Item>
                        </Sub>
                    </Sub>
                </Menu>
            </div>
        )
    }
}

export default TestMenu
