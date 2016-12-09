import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import Popper from 'popper.js'
import {prefix, classnames, except} from '../../utils'
import Icon from '../Icon'
class Select extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            options: props.options,
            active: !!props.active,
            popperdata: null,
            popper: null,
            raf: 0
        }
        this.open = this.open.bind(this)
        this.update = this.update.bind(this)
        this._setState = this._setState.bind(this)
        this.itemOnClick = this.itemOnClick.bind(this)
        this.documentClick = this.documentClick.bind(this)
        this.selectOnClick = this.selectOnClick.bind(this)
    }
    getSelected(){
        return this.state.options.filter(item => (item.selected))
    }
    wrapper(options){
        if(!this.props.multiple){
            return options[0]
        }
        let cn = prefix('select-title__item')
        return options.map((option, idx) => {
            return (
            <span key={idx} className={cn} onClick={(e) => (e.stopPropagation(), e.preventDefault, false)}>
                {option.name}
                <Icon className={prefix('select-title__cancel')} onClick={(e) => this.itemOnClick(option, e)}>&#xE5CD;</Icon>
            </span>)
        })
    }
    update() {
        if (this.state.popper) {
            this.state.popper.update()
            window.requestAnimationFrame(this.update)
            // this.setState({raf: window.requestAnimationFrame(this.update)})
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.documentClick, false)
        // if(this.state.active){
        //     this.refs.popper.style.height = this.getHeight()
        // }
        document.body.appendChild(this.refs.popper)
        const _setState = this._setState
        const update = this.update
        const popper = new Popper(this.refs.reference, this.refs.popper, {
            placement: 'left-end',
            modifiersIgnored: ['applyStyle']
        }).onUpdate(function(data) {
            _setState({popperdata: data, popper}, update)
        })
    }
    getPopperStyle(data) {
        if (!data) {
            return {}
        }
        const left = Math.round(data.offsets.popper.left)
        const top = Math.round(data.offsets.popper.top)
        return {
            position: data.offsets.popper.position,
            top: `${top}px`,
            left: `${left}px`
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.documentClick, false)
    }
    getHeight(){
        return this.refs.popper.children[0].offsetHeight + 'px'
    }
    open(e){
        this._setState({
            active: true
        })
    }
    itemOnClick(option, e) {
        if(!this.props.multiple){
            this._setState({
                options: this.state.options.map(item => {
                    return {
                        ...item,
                        selected: item.value == option.value
                    }
                }),
                active: false
            })
        }else{
            this._setState({
                options: this.state.options.map(item => {
                    let ret = {
                        ...item,
                        selected: item.value == option.value ? !item.selected : item.selected
                    }
                    console.log(ret)
                    return ret
                })
            })
        }
        e.preventDefault()
        e.stopPropagation()
        return false
    }
    documentClick(e){
        if(e.target.closest('[data-select]') !== this.refs.container){
            this._setState({
                active: false
            })
        }
    }
    selectOnClick(e){
    }
    _setState(obj, callback){
        this.setState(Object.assign({}, this.state, obj), callback)
    }
    render() {
        let selected = this.getSelected()
        let transform = this.state.active ? 'scaleY(1)' : 'scaleY(0)'
        let wrappercn = prefix('select__wrapper')
        if(this.state.active){
            wrappercn = prefix('select__wrapper--active')
        }
        let style = this.getPopperStyle(this.state.popperdata)
        return (
            <div ref="container" data-select className={prefix('select')} onClick={this.selectOnClick}>
                <div ref="reference" className={prefix('select-title')} onClick={this.open}>
                    {!this.props.multiple ? selected[0]['name'] : this.wrapper(selected)}
                    <Icon className={prefix('select__icon')}>&#xE5C5;</Icon>
                </div>
                <div ref="popper" className={wrappercn} style={{...style}}>
                    <ul className={this.props.multiple ? prefix('select__multiple_menu') : prefix('select__menu')}>
                        {this.state.options.map((option, idx) => {
                            let cn = prefix('select__item');
                            if(option.selected){
                                cn = classnames(cn, 'is-active')
                            }
                            return (<li key={idx} className={cn} onClick={(e) => this.itemOnClick(option, e)}>{option.name}</li>)
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Select
