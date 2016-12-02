import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import {Grid, GridCell} from '../../components/Grid'
class TestGrid extends Component {
    render() {
        return (
            <div>
                <div>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="12">col-12</GridCell>
                        <GridCell className="demo-grid-cell" col="12">col-12</GridCell>
                    </Grid>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="2">col-2</GridCell>
                        <GridCell className="demo-grid-cell" col="4">col-4</GridCell>
                        <GridCell className="demo-grid-cell" col="6">col-6</GridCell>
                        <GridCell className="demo-grid-cell" col="12">col-12</GridCell>
                    </Grid>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="10">col-10</GridCell>
                        <GridCell className="demo-grid-cell" col="2">col-2</GridCell>
                        <GridCell className="demo-grid-cell" col="12">col-12</GridCell>
                    </Grid>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="15">col-15</GridCell>
                        <GridCell className="demo-grid-cell" col="9">col-9</GridCell>
                    </Grid>
                </div>
                <div>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="3" offset="9">col-3</GridCell>
                        <GridCell className="demo-grid-cell" col="3" offset="4">col-3</GridCell>
                    </Grid>
                    <Grid className="demo-row">
                        <GridCell className="demo-grid-cell" col="4" offset="2">col-4</GridCell>
                        <GridCell className="demo-grid-cell" col="7" offset="2">col-7</GridCell>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default TestGrid
