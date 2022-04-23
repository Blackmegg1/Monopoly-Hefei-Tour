import React, { Component } from 'react'
import Player from '../Player'
import { Card } from 'antd'
import './index.css'

//引入图片,用作背景,大小固定为 124px X 90px
import house1 from '../../img/house1.png'

// 地图中每个格子组件
export default class Square extends Component {

    render() {
        return (
            <Card
                title={`编号:${this.props.num}`}
                bordered={false}
                className="Square"
                headStyle={{ 'fontSize': '14px', 'padding': '1px' }}
                bodyStyle={{ 'padding': '5px', 'background': `url(${house1}) no-repeat`, 'height': "12vh" }}
            >
                <Player visible={this.props.visible} />
            </Card >
        )
    }
}
