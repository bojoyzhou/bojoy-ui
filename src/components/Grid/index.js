import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import style from './style.less'
import {prefix, classnames, except} from '../../utils'

class Grid extends Component {
    render() {
        const className = classnames(this.props.className, prefix("grid"))
        const props = except(this.props, GridCell.propTypes)
        return (
            <div {...props} className={className}>
                { this.props.children}
            </div>
        )
    }
}

class GridCell extends Component{
    render(){
        const className = classnames(this.props.className,
                prefix('grid-cell'),
                prefix('grid-col-' + this.props.col),
                prefix('grid-offset-' + this.props.offset))

        const props = except(this.props, GridCell.propTypes)
        return(
            <div {...props} className={className}>
                { this.props.children }
            </div>
        )
    }
}
GridCell.propTypes = {
    col: PropTypes.string.isRequired,
    offset: PropTypes.string
}
export {Grid, GridCell}
