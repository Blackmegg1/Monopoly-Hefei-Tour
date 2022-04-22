import React, { Component } from 'react'
import Player from '../Player'
import { Card } from 'antd'

import './index.css'

// 地图中每个格子组件
export default class Square extends Component {

    render() {
        return (
            <Card
                title={`编号:${this.props.num}`}
                bordered={false}
                className="Square"
                headStyle={{ 'fontSize': '16px', 'padding': '3px' }}
                bodyStyle={{ 'padding': '5px' }}
            >
                <Player visible={this.props.visible} />
            </Card>
        )
    }
}
