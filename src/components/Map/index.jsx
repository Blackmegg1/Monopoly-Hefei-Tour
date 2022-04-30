import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Square from '../Square'
import Info from '../Info'
import Step from '../Step/index.jsx'
import Dice from '../Dice'

import './index.css'

let mapData = [
  { num: 0, visible: ['visble', 'visble', 'visble', 'visble'], name: '起点', type: 'event', price: '' },
  { num: 1, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '安徽大学', type: 'place', price: '2500' },
  { num: 2, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥工业大学', type: 'place', price: '3000' },
  { num: 3, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '安医大二附院', type: 'place', price: '4000' },
  { num: 4, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '省博物院', type: 'place', price: '7500' },
  { num: 5, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥大剧院', type: 'place', price: '7000' },
  { num: 6, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '奇遇', type: 'event', price: '' },
  { num: 7, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '大蜀山', type: 'place', price: '4500' },
  { num: 8, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '科学岛', type: 'place', price: '10000' },
  { num: 9, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '安徽农业大学', type: 'place', price: '2000' },
  { num: 10, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '奇遇', type: 'event', price: '' },
  { num: 11, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥火车站', type: 'place', price: '6000' },
  { num: 12, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '之心城', type: 'place', price: '10000' },
  { num: 13, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '逍遥津', type: 'place', price: '6500' },
  { num: 14, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '步行街', type: 'place', price: '8000' },
  { num: 15, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '中国科技大学', type: 'place', price: '3500' },
  { num: 16, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '工大老区', type: 'place', price: '3300' },
  { num: 17, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '罍街', type: 'place', price: '4000' },
  { num: 18, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '奇遇', type: 'event', price: '' },
  { num: 19, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥南站', type: 'place', price: '7000' },
  { num: 20, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '国际会展中心', type: 'place', price: '9900' },
  { num: 21, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥融创茂', type: 'place', price: '6000' },
  { num: 22, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '国家森林公园', type: 'place', price: '3500' },
  { num: 23, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '合肥市政府', type: 'place', price: '15000' },
  { num: 24, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '星达城', type: 'place', price: '6000' },
  { num: 25, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '奇遇', type: 'event', price: '' },
  { num: 26, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '中环城', type: 'place', price: '8000' },
  { num: 27, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '明珠广场', type: 'place', price: '4000' },
  { num: 28, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '翡翠迎宾馆', type: 'place', price: '20000' },
  { num: 29, visible: ['hidden', 'hidden', 'hidden', 'hidden'], name: '安徽建筑大学', type: 'place', price: '2200' }
]

let userData = [
  { num: 0, userColor: '#87d068', price: 50000 },
  { num: 1, userColor: '#68c4d0', price: 50000 },
  { num: 2, userColor: '#d06868', price: 50000 },
  { num: 3, userColor: '#faad14', price: 50000 }
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

  changeAssets(palyerNum, gap) {
    let newUserData = this.state.userData
    palyerNum.map((v, i) => {
      newUserData[v].price += gap[i]
      return v
    })
    this.setState(newUserData)
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
                  <Square
                    num={v.num}
                    visible={v.visible}
                    name={v.name}
                    type={v.type}
                    price={v.price}
                    userData={userData}
                    currentPlayerNum={this.state.currentPlayerNum}
                    changeAssets={(palyerNum, gap) => this.changeAssets(palyerNum, gap)} />
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
                        <Square
                          num={v.num}
                          visible={v.visible}
                          name={v.name}
                          type={v.type}
                          price={v.price}
                          userData={userData}
                          currentPlayerNum={this.state.currentPlayerNum}
                          changeAssets={(palyerNum, gap) => this.changeAssets(palyerNum, gap)} />
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
                        <Square
                          num={v.num}
                          visible={v.visible}
                          name={v.name}
                          type={v.type}
                          price={v.price}
                          userData={userData}
                          currentPlayerNum={this.state.currentPlayerNum}
                          changeAssets={(palyerNum, gap) => this.changeAssets(palyerNum, gap)} />
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
                  <Square
                    num={v.num}
                    visible={v.visible}
                    name={v.name}
                    type={v.type}
                    price={v.price}
                    userData={userData}
                    currentPlayerNum={this.state.currentPlayerNum}
                    changeAssets={(palyerNum, gap) => this.changeAssets(palyerNum, gap)} />
                </Col>)
              }
            })
          }
        </Row>

      </div>
    )
  }
}