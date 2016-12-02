import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import {Menu, MenuItem, SubMenu} from '../../components/Menu'
class TestMenu extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeKey:3
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
                <Menu activeKey={this.state.activeKey} onChange={this.onChange} style={{width: '250px'}}>
                    <MenuItem idx="1">hahahah</MenuItem>
                    <MenuItem idx="2">hahahah</MenuItem>
                    <SubMenu expand={true} title={'SubMenu'}>
                        <MenuItem idx="3">hahahah</MenuItem>
                        <MenuItem idx="4">hahahah</MenuItem>
                    </SubMenu>
                    <SubMenu expand={false} title={'SubMenu'}>
                        <MenuItem idx="5">hahahah</MenuItem>
                        <MenuItem idx="6">hahahah</MenuItem>
                    </SubMenu>
                    <SubMenu title={'SubMenu'}>
                        <MenuItem idx="7">hahahah</MenuItem>
                        <MenuItem idx="8">hahahah</MenuItem>
                    </SubMenu>
                </Menu>

                <Menu activeKey={this.state.activeKey} onChange={this.onChange} type="inline">
                    <MenuItem idx="1">hahahah</MenuItem>
                    <MenuItem idx="2">hahahah</MenuItem>
                    <SubMenu title={'S'}>
                        <MenuItem idx="3">hahahah</MenuItem>
                        <MenuItem idx="4">hahahah</MenuItem>
                    </SubMenu>
                    <SubMenu title={'SubMenu'}>
                        <MenuItem idx="5">hahahah</MenuItem>
                        <MenuItem idx="6">hahahah</MenuItem>
                    </SubMenu>
                    <SubMenu title={'SubMenu'}>
                        <MenuItem idx="7">hahahah</MenuItem>
                        <MenuItem idx="8">hahahah</MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default TestMenu
