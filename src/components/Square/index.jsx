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
            owner: -1,
            ownerColor: ''
        }
    }

    componentDidUpdate(prevp, prevs) {
        if (this.props.visible[prevp.currentPlayerNum] === 'visible' && this.state.owner === -1) {
            this.props.changeAssets([prevp.currentPlayerNum], [-(this.props.price)])
            if (this.state === prevs) {
                this.setState({
                    owner: prevp.currentPlayerNum,
                    ownerColor: this.props.userData[prevp.currentPlayerNum].userColor
                })
            }
        }
        else if (this.props.visible[prevp.currentPlayerNum] === 'visible' && this.props.currentPlayerNum !== prevp.currentPlayerNum && prevs.owner !== prevp.currentPlayerNum) {
            this.props.changeAssets([prevp.currentPlayerNum, prevs.owner], [-(this.props.price * 0.2), this.props.price * 0.2])
            // console.log('prevp', prevp)
            // console.log('props', this.props)
        }
    }

    render() {
        return (
            <Card
                title={this.props.type === 'place' ? `${this.props.name} ${this.props.price}$` : `${this.props.name}`}
                bordered={false}
                className="Square"
                headStyle={{ 'textAlign': 'center', 'fontSize': '12px', 'padding': '0px', 'backgroundColor': `${this.state.ownerColor}` }}
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
