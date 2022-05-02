import React, { Component } from 'react'
import Player from '../Player'
import { Card, Modal, Button, message } from 'antd'
import './index.css'

//引入图片,用作背景,大小固定为 124px X 90px
// import house0 from '../../img/house0.png'
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
            ownerColor: '',
            confirmBoxVisible: false,
            cannotUpdate: true,
            cannotPayment: false,
            level: 0,
            tolls: this.props.price * 0.2 //过路费
        }
    }

    //为了后面可以通过拼接变量名实现图片的变换
    backgroundImg = {
        house0: '',
        house1: house1,
        house2: house2,
        house3: house3,
        house4: house4
    }
    // componentDidUpdate(prevp, prevs) {
    //     if (this.props.visible[prevp.currentPlayerNum] === 'visible' && this.state.owner === -1) {
    //         this.props.changeAssets([prevp.currentPlayerNum], [-(this.props.price)])
    //         if (this.state === prevs) {
    //             this.setState({
    //                 owner: prevp.currentPlayerNum,
    //                 ownerColor: this.props.userData[prevp.currentPlayerNum].userColor
    //             })
    //         }
    //     }
    //收过路费逻辑
    //     else if (this.props.visible[prevp.currentPlayerNum] === 'visible' && this.props.currentPlayerNum !== prevp.currentPlayerNum && prevs.owner !== prevp.currentPlayerNum) {
    //         this.props.changeAssets([prevp.currentPlayerNum, prevs.owner], [-(this.props.price * 0.3), this.props.price * 0.2])
    //         // console.log('prevp', prevp)
    //         // console.log('props', this.props)
    //     }
    // }

    componentDidUpdate(prevp, prevs) {
        //购买
        if (this.props.visible[prevp.currentPlayerNum] === 'visible' &&
            this.props.type === 'place' &&
            this.state.owner === -1) {
            this.changeConfirmBoxVisible(true)
        }
        //升级
        else if (this.props.visible[prevp.currentPlayerNum] === 'visible' &&
            this.props.type === 'place' &&
            prevs.owner === this.state.owner &&
            prevs.owner === prevp.currentPlayerNum &&
            this.props.currentPlayerNum !== prevp.currentPlayerNum) {
            this.changeConfirmBoxVisible(true)
        }
        //收过路费
        else if (this.props.visible[prevp.currentPlayerNum] === 'visible' &&
            this.state.owner !== -1 &&
            this.props.currentPlayerNum !== prevp.currentPlayerNum &&
            this.state.owner !== prevp.currentPlayerNum) {
            console.log(this.state.owner)
            //全局通知
            message.info(<div>
                <span style={{ 'color': `${this.props.userData[prevp.currentPlayerNum].userColor}` }}>{`Player${prevp.currentPlayerNum + 1}`}</span>
                <span> 向 </span>
                <span style={{ 'color': `${this.props.userData[this.state.owner].userColor}` }}>{`Player${prevs.owner + 1}`}</span>
                <span> 支付了 </span>
                <span style={{ 'fontWeight': '600' }}>{`${this.state.tolls}$`}</span>
                <span> 过路费 </span>
            </div>)
            this.props.changeAssets([prevp.currentPlayerNum, prevs.owner], [-(this.state.tolls), this.state.tolls])
        }
    }

    changeConfirmBoxVisible(v) { //控制弹窗
        this.setState({ confirmBoxVisible: v })
    }

    payment() {
        let beforePlayerNum = -1
        if (this.props.currentPlayerNum === 0) {
            //currentPlayerNum为当前扔色子的人，所以 beforePlayerNum为决策者
            beforePlayerNum = 3 
        }
        else {
            beforePlayerNum = this.props.currentPlayerNum - 1
        }
        this.props.changeAssets([beforePlayerNum], [-(this.props.price)])
        message.info(<div>
            <span style={{ 'color': `${this.props.userData[beforePlayerNum].userColor}` }}>{`Player${beforePlayerNum + 1}`}</span>
            <span> 购买了 </span>
            <span style={{ 'fontWeight': '600' }}>{`${this.props.name}`}</span>
        </div>)
        this.setState({
            owner: beforePlayerNum,
            ownerColor: this.props.userData[beforePlayerNum].userColor,
            cannotUpdate: false,
            cannotPayment: true,
            confirmBoxVisible: false,
        })
    }

    update() {
        let oldLevel = this.state.level
        let oldtolls = this.state.tolls
        let beforePlayerNum = -1
        if (this.props.currentPlayerNum === 0) {
            //currentPlayerNum为当前扔色子的人，所以 beforePlayerNum为此弹窗决策者
            beforePlayerNum = 3 
        }
        else {
            beforePlayerNum = this.props.currentPlayerNum - 1
        }
        //升级费用为0.25
        this.props.changeAssets([beforePlayerNum], [-(this.props.price * 0.25)])
        //全局通知
        message.info(<div>
            <span style={{ 'color': `${this.props.userData[beforePlayerNum].userColor}` }}>{`Player${beforePlayerNum + 1}`}</span>
            <span> 升级了 </span>
            <span style={{ 'fontWeight': '600' }}>{`${this.props.name}`}</span>
        </div>)
        this.setState({
            level: oldLevel + 1,
            tolls: oldtolls + this.props.price * 0.1,
            confirmBoxVisible: false,
        })
    }

    render() {
        return (
            <><Modal
                title="请选择你的操作"
                visible={this.state.confirmBoxVisible}
                onCancel={() => this.changeConfirmBoxVisible(false)}
                key={this.props.num}
                footer={[
                    <Button key={`${this.props.num}buy`} type='primary' disabled={this.state.cannotPayment} onClick={() => this.payment()}>购买</Button>,
                    <Button key={`${this.props.num}update`} danger disabled={this.state.cannotUpdate} onClick={() => this.update()}>升级</Button>,
                    <Button key={`${this.props.num}cancel`} onClick={() => this.changeConfirmBoxVisible(false)}>取消</Button>
                ]}
            >
                <div>当前在：<span className='textSpan'>{`${this.props.name}`}</span></div>
                <div>地价为：<span className='textSpan'>{`${this.props.price}`}$</span></div>
                <div>升级费用为：<span className='textSpan'>{`${this.props.price * 0.25}$`}</span></div>
                <div>过路费为：<span className='textSpan'>{`${this.state.tolls}$`}</span></div>
            </Modal>
                <Card
                    title={this.props.type === 'place' ? `${this.props.name} ${this.props.price}$` : `${this.props.name}`}
                    bordered={false}
                    className="Square"
                    headStyle={{ 'textAlign': 'center', 'fontSize': '12px', 'padding': '0px', 'backgroundColor': `${this.state.ownerColor}` }}
                    bodyStyle={{ 'padding': '5px', 'height': "12vh", 'background': `url(${this.backgroundImg[`house${this.state.level}`]}) no-repeat` }}
                >
                    <ul className='cardUl'>
                        {this.props.userData.map((value, index) => {
                            return (<li className='cardLi' key={index}>
                                <Player visible={this.props.visible[index]} userData={value} />
                            </li>)
                        })}
                    </ul>
                </Card >
            </>
        )
    }
}
