import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {prefix, classnames, except} from '../../utils'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {EventEmitter} from 'events'

import Icon from '../Icon'
import style from './style.less'
import { slide } from '../Animate'

class Menu extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            activeKey:null
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick(e){
        if(this.props.onClick){
            this.props.onClick.apply(null, arguments)
        }
        let key = null
        try{
            key = e.target.closest('[data-key]').getAttribute('data-key')
        }catch(e){}

        if(key){
            this.props.onChange && this.props.onChange(key, e)
        }else{
            this._setState({
                activeKey:key
            })
        }
    }
    _setState(obj){
        this.setState(Object.assign({}, this.state, obj))
    }
    render() {
        let className = classnames(prefix('menu'), this.props.className)
        const type = this.props.type
        if(type == 'inline'){
            className = classnames(className, prefix('menu-inline'))
        }
        const props = except(this.props, Menu.propTypes)
        let activeKey = this.props.activeKey
        if(!activeKey){

        }
        const children = this.props.children.map((item, key) => {
            let isActive
            if(activeKey === undefined){
                isActive = true
                activeKey = item.props.idx
            }else{
                isActive = item.props.idx == activeKey
            }
            const child = React.cloneElement(item, {
                ...item.props,
                activeKey,
                key,
                type,
                isActive
            })
            return child
        })
        return (
            <ul {...props}
                className={className}
                onClick={this.onClick}>
                { children }
            </ul>
        )
    }
}

Menu.propTypes={
    type: PropTypes.string,
    activeKey: PropTypes.any
}
class SubMenu extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            expand: true,
            // expand: this.props.type == 'inline' ? false : props.expand,
        }
        this.clickItem = this.clickItem.bind(this)
        this.onMouseOver = this.onMouseOver.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }
    clickItem(e){
        if(this.props.type !== 'inline'){
            this._setState({
                expand: !this.state.expand
            })
        }
    }
    onMouseOver(e) {
        if(this.props.type == 'inline'){
            this._setState({
                expand: true
            })
        }
    }
    onMouseLeave(e) {
        if(this.props.type == 'inline'){
            this._setState({
                expand: false
            })
        }
    }
    _setState(obj){
        this.setState(Object.assign({}, this.state, obj))
    }
    render() {
        const className = classnames(prefix('menu_sub'), this.props.className)
        const props = except(this.props, SubMenu.propTypes)

        const activeKey = this.props.activeKey
        const children = this.props.children.map((item, key) => {
            const isActive = item.props.idx == activeKey
            const child = React.cloneElement(item, {
                ...except(item.props, SubMenu.propTypes),
                key,
                isActive
            })
            return child
        })
        return (
            <ReactCSSTransitionGroup component={MenuItem}
                transitionName={slide}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                className={this.state.expand ? prefix('menu_sub--active') : ''}
                onClick={this.clickItem}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
                title={this.props.title}
                hasChild={true}>
                { this.state.expand ?
                    <ul {...props} className={className}>
                        { children }
                    </ul>
                    :null
                }
            </ReactCSSTransitionGroup>
        )
    }
}
SubMenu.propTypes={
    type: PropTypes.string,
    expand:PropTypes.bool,
    title:PropTypes.any,
    activeKey: PropTypes.any,
    isActive:PropTypes.bool
}
class MenuItem extends Component {
    constructor(props, context) {
        super(props, context)
        this.onClick = this.onClick.bind(this)
    }
    onClick(){
        if(this.props.onClick){
            this.props.onClick.apply(null, arguments)
        }
    }
    _setState(obj){
        this.setState(Object.assign({}, this.state, obj))
    }
    render() {
        const className = classnames(prefix('menu_item'), this.props.className, this.props.isActive ? prefix('menu_item--active') : '')
        let titleClassName = classnames(prefix('menu_item__title'))
        const props = except(this.props, MenuItem.propTypes)
        if(this.props.hasChild){
            titleClassName = classnames(titleClassName, prefix('menu_item__title--haschild'))
        }
        let title = this.props.title
        return (
            <li ref="li" className={className} onMouseOver={this.props.onMouseOver} onMouseLeave={this.props.onMouseLeave}>
                <div {...props} data-key={this.props.idx} className={titleClassName} onClick={this.onClick}>
                    { title ? title : this.props.children }
                    <Icon className={prefix('menu_item__tail')}>&#xE5C5;</Icon>
                </div>
                { title ? this.props.children : null }
            </li>
        )
    }
}
MenuItem.propTypes={
    type: PropTypes.string,
    title:PropTypes.any,
    hasChild: PropTypes.bool,
    isActive: PropTypes.bool,
    activeKey: PropTypes.any,
    idx: PropTypes.string,
    key: PropTypes.any,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func
}

export {
    Menu,
    MenuItem,
    SubMenu
}

