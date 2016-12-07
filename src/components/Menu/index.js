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
            activeKey: props.activeKey
        }
        this.onClick = this.onClick.bind(this)
    }
    onClick(key){
        if(this.props.onChange){
            this.props.onChange(key)
        }else{
            this._setState({
                activeKey: key
            })
        }
    }
    getActiveKey(){
        if(this.props.onChange){
            return this.props.activeKey
        }else{
            return this.state.activeKey
        }
    }
    children(){
        console.log(this.getActiveKey())
        return this.props.children.map((child, key) => {
            const activeKey = this.getActiveKey()
            return React.cloneElement(child, {
                activeKey,
                deep: 0,
                m_onClick: this.onClick,
                ...child.props,
                ['data-key']: child.props['data-key'],
                key,
            }, child.props.children)
        })
    }
    _setState(obj){
        this.setState(Object.assign({}, this.state, obj))
    }
    render() {
        let cn = classnames(prefix('menu'), this.props.className)
        let props = except(this.props, Menu.propTypes)
        return (
            <ul {...props} className={cn}>
                { this.children() }
            </ul>
        )
    }
}

Menu.propTypes={
    activeKey:PropTypes.string
}
class Sub extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            expand: props.expand,
        }
        this.height = this.height.bind(this)
        this.onClick = this.onClick.bind(this)
        console.log(props.activeKey)
    }
    componentDidMount() {
        const height = this.height()
        if(this.state.expand){
            try{
                this.refs.wrapper.style.height = height
            }catch(e){}
        }
    }
    height(){
        try{
            return this.refs.wrapper.children[0].offsetHeight + 'px'
        }catch(e){
            return 'auto'
        }
    }
    children(){
        return this.props.children.map((child, key) => {
            const {activeKey, m_onClick} = this.props
            let parent = this
            let deep = this.props.deep + 1
            return React.cloneElement(child, {
                activeKey,
                m_onClick,
                parent,
                deep,
                key,
                ...child.props,
                ['data-key']: child.props['data-key'],
            }, child.props.children)
        })
    }
    expand(){
        this._setState({
            expand: true
        }, () => {
            try{
                this.props.parent.expand()
            }catch(e){}
        })
    }
    autoHeight(){
        this.refs.wrapper.style.height = 'auto'
        try{
            this.props.parent.autoHeight()
        }catch(e){}
    }
    onClick(){
        if(this.state.expand){
            this.refs.wrapper.style.height = this.height()
        }

        try{
            this.props.parent.autoHeight()
        }catch(e){}
        this._setState({
            expand: !this.state.expand
        })
    }
    _setState(obj, callback){
        this.setState(Object.assign({}, this.state, obj), callback)
    }
    render() {
        let cn = classnames(prefix('item_wrapper'), this.props.className)
        let icn = prefix('item_parent')
        let height = 0
        if(this.state.expand){
            icn = classnames(icn, prefix('item_parent--active'))
            height = this.height()
        }
        return (
            <Item title={this.props.title} className={icn} onClick={this.onClick}
                deep={this.props.deep}>
                <div ref="wrapper" className={cn} style={{height}}>
                    <ul className={prefix('sub')}>
                        { this.children() }
                    </ul>
                </div>
            </Item>
        )
    }
}
Sub.propTypes={
    expand:PropTypes.bool
}
class Item extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            active: props['data-key'] && props['data-key'] === props.activeKey
        }
        this.onClick = this.onClick.bind(this)
    }
    componentDidMount() {
        if(this.state.active){
            try{
                this.props.parent.expand()
            }catch(e){}
        }
    }
    componentWillReceiveProps(nextProps) {
        this._setState({
            active: nextProps['data-key'] && nextProps['data-key'] === nextProps.activeKey
        })
    }
    onClick(){
        if(this.props.m_onClick){
            this.props.m_onClick.apply(null, [this.props['data-key']].concat(arguments))
        }
        if(this.props.onClick){
            this.props.onClick.apply(null, arguments)
        }
    }
    _setState(obj){
        this.setState(Object.assign({}, this.state, obj))
    }
    render() {
        const title = this.props.title
        let cn = classnames(prefix('item'), this.props.className)
        if(this.state.active){
            cn = classnames(cn, prefix('item--active'))
        }
        const paddingLeft = (this.props.deep * 20 + 8) + 'px';
        return (
            <li className={cn}>
                <div className={prefix('item_title')} onClick={this.onClick} style={{paddingLeft}}>
                    { title ? title : this.props.children }
                    <Icon className={prefix('item_tail')}>&#xE5C5;</Icon>
                </div>
                { title ? this.props.children : null }
            </li>
        )
    }
}
Item.propTypes={
}

export {
    Menu,
    Item,
    Sub
}

