import React, { Component } from 'react'
import { Steps } from 'antd';


import './index.css'

const { Step } = Steps;

//显示目前轮到哪个玩家进行操作的进度条
export default class Turn extends Component {
    render() {
        return (
            <div className='turnBox'>
                <Steps current={this.props.currentPlayerNum} labelPlacement={'vertical'}>
                    {Array(this.props.players).fill(undefined).map((value, index) => {
                        return (<Step key={index} title={'Player' + (index + 1)} />)
                    })}
                </Steps>
            </div>
        )
    }
}
