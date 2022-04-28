import React, { Component } from 'react'
import Player from '../Player'
import { Card } from 'antd'
import './index.css'

//引入图片,用作背景,大小固定为 124px X 90px
// eslint-disable-next-line
import house1 from '../../img/house1.png'
import house2 from '../../img/house2.png'
import house3 from '../../img/house3.png'
import house4 from '../../img/house4.png'


// 地图中每个格子组件
export default class Square extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: this.props.num * 100
        }
    }
    
    render() {
        return (
            <Card
                title={`编号:${this.props.num},价格:${this.props.num * 100}$`}
                bordered={false}
                className="Square"
                headStyle={{ 'fontSize': '14px', 'padding': '1px' }}
                bodyStyle={{ 'padding': '5px', 'height': "12vh" }}
            // bodyStyle={{ 'background': `url(${house1}) no-repeat` }}
            >
                <ul className='cardUl'>
                    {this.props.userData.map((value, index) => {
                        return (<li className='cardLi' key={index}>
                            <Player visible={this.props.visible[index]} userData={value} />
                        </li>)
                    })}
                </ul>

            </Card >
        )
    }
}
