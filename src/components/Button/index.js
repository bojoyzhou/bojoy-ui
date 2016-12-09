import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import {prefix, classnames, except} from '../../utils'

class Button extends Component {
    render() {
        let cn = prefix('btn')
        const type = this.props.type || 'normal'
        const size = this.props.size || 'normal'
        cn = classnames(prefix(`btn-${type}--${size}`), this.props.className)
        return (
            <button className={cn}>
                { this.props.children }
            </button>
        )
    }
}

export default Button
