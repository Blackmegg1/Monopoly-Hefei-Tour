import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Square from '../Square'
import Info from '../Info'
import Step from '../Step/index.jsx'
import Dice from '../Dice'

import './index.css'

let mapData = [
  { num: 0, visible: ['visble', 'visble', 'visble', 'visble'] },
  { num: 1, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 2, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 3, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 4, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 5, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 6, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 7, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 8, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 9, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 10, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 11, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 12, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 13, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 14, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 15, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 16, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 17, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 18, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 19, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 20, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 21, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 22, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 23, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 24, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 25, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 26, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 27, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 28, visible: ['hidden', 'hidden', 'hidden', 'hidden'] },
  { num: 29, visible: ['hidden', 'hidden', 'hidden', 'hidden'] }
]

let userData = [
  { num: 0, userColor: '#87d068' },
  { num: 1, userColor: '#68c4d0' },
  { num: 2, userColor: '#d06868' },
  { num: 3, userColor: '#faad14' }
]
// 地图组件
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      diceNum: [0, 0, 0, 0],
      mapData: mapData,
      userData: userData,
      currentPlayerNum: 0,
      players: userData.length //玩家数量
    }
  }

  getDiceNum(n) {
    let currentPlayerNum = this.state.currentPlayerNum
    let newMapData = this.state.mapData
    let currentOldDiceNum = this.state.diceNum[currentPlayerNum]
    let newDiceNum = this.state.diceNum
    newDiceNum[currentPlayerNum] = (n + currentOldDiceNum) % 30
    newMapData[currentOldDiceNum].visible[currentPlayerNum] = 'hidden'
    newMapData[(currentOldDiceNum + n) % 30].visible[currentPlayerNum] = 'visible'
    this.setState({ diceNum: newDiceNum, mapData: newMapData, currentPlayerNum: (currentPlayerNum + 1) % (this.state.players) })
  }

  render() {
    return (
      <div>
        <Row className="row">
          {
            // eslint-disable-next-line
            this.state.mapData.map((v, k) => {
              if (k < 12) {
                return (<Col span={2} className='col-item' key={v.num}>
                  <Square num={v.num} visible={v.visible} userData={userData} />
                </Col>)
              }
            })
          }
        </Row>

        <Row className='row-center'>
          <Col span={2} >
            {
              // 这里需要反转数组
              // eslint-disable-next-line
              this.state.mapData.slice(27, 30).reverse().map((v, k) => {
                if (k < 3) {
                  return (
                    <Row className='row' key={v.num}>
                      <Col span={24} className='col-item'>
                        <Square num={v.num} visible={v.visible} userData={userData} />
                      </Col>
                    </Row>)
                }
              })
            }
          </Col>

          {/* main box */}
          <Col span={20} className='col-item'>
            <Info userData={this.state.userData} />
            <Step currentPlayerNum={this.state.currentPlayerNum} players={this.state.players} />
            <Dice getDiceNum={(n) => this.getDiceNum(n)} />
          </Col>


          <Col span={2}>
            {
              // eslint-disable-next-line
              this.state.mapData.map((v, k) => {
                if (11 < k && k < 15) {
                  return (
                    <Row className='row' key={v.num}>
                      <Col span={24} className='col-item'>
                        <Square num={v.num} visible={v.visible} userData={userData} />
                      </Col>
                    </Row>
                  )
                }
              })
            }
          </Col>
        </Row>

        <Row className='row'>
          {
            // 这里需要反转数组
            // eslint-disable-next-line
            this.state.mapData.slice(15, 27).reverse().map((v, k) => {
              if (k < 13) {
                return (<Col span={2} className='col-item' key={v.num}>
                  <Square num={v.num} visible={v.visible} userData={userData} />
                </Col>)
              }
            })
          }
        </Row>

      </div>
    )
  }
}