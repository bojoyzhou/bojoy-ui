import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import {prefix, classnames, except} from '../../utils'

class Icon extends Component {
    render() {
        const className = classnames('material-icons', prefix('icon'), this.props.className)
        const props = except(this.props, Icon.propTypes)
        return (
            <i {...props} className={className}>{this.props.children}</i>
        )
    }
}
Icon.propTypes={

}
export default Icon
