import React, { Component, PropsType } from 'react'
import { Link } from 'react-router'
import style from './style.less'

import TestGrid from '../test/Grid'
import TestIcon from '../test/Icon'
import TestMenu from '../test/Menu'
import TestButton from '../test/Button'
import TestSelect from '../test/Select'

class App extends Component {
    render() {
        return (
            <div>
                <TestGrid></TestGrid>
                <TestIcon></TestIcon>
                <TestMenu></TestMenu>
                <TestButton></TestButton>
                <TestSelect></TestSelect>
            </div>
        )
    }
}

export default App
