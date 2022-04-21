import React, { Component } from 'react'
import { Steps } from 'antd';

import './index.css'

const { Step } = Steps;

//显示目前轮到哪个玩家进行操作的进度条
export default class Turn extends Component {
    render() {
        return (
            <div className='turnBox'>
                <Steps current={2}>
                    <Step title="Player1" />
                    <Step title="Player2" />
                    <Step title="Player3" />
                    <Step title="Player4" />
                </Steps>
            </div>
        )
    }
}
