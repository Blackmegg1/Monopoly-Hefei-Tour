import React, { Component } from 'react'
import { Col, Row } from 'antd'

import Square from '../Square'
import Info from '../Info'
import Turn from '../Turn'
import Dice from '../DiceBox'

import './index.css'

let mapData = [
  { num: 0, visible: 'visble' },
  { num: 1, visible: 'hidden' },
  { num: 2, visible: 'hidden' },
  { num: 3, visible: 'hidden' },
  { num: 4, visible: 'hidden' },
  { num: 5, visible: 'hidden' },
  { num: 6, visible: 'hidden' },
  { num: 7, visible: 'hidden' },
  { num: 8, visible: 'hidden' },
  { num: 9, visible: 'hidden' },
  { num: 10, visible: 'hidden' },
  { num: 11, visible: 'hidden' },
  { num: 12, visible: 'hidden' },
  { num: 13, visible: 'hidden' },
  { num: 14, visible: 'hidden' },
  { num: 15, visible: 'hidden' },
  { num: 16, visible: 'hidden' },
  { num: 17, visible: 'hidden' },
  { num: 18, visible: 'hidden' },
  { num: 19, visible: 'hidden' },
  { num: 20, visible: 'hidden' },
  { num: 21, visible: 'hidden' },
  { num: 22, visible: 'hidden' },
  { num: 23, visible: 'hidden' },
  { num: 24, visible: 'hidden' },
  { num: 25, visible: 'hidden' },
  { num: 26, visible: 'hidden' },
  { num: 27, visible: 'hidden' },
  { num: 28, visible: 'hidden' },
  { num: 29, visible: 'hidden' }
]

// 地图组件
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      diceNum: 0,
      mapData: mapData,
    }
  }

  getDiceNum(n) {
    let newMapData = this.state.mapData
    let oldDiceNum = this.state.diceNum
    newMapData[oldDiceNum].visible = 'hidden'
    newMapData[(oldDiceNum + n) % 30].visible = 'visible'
    this.setState({ diceNum: (n + oldDiceNum) % 30, mapData: newMapData })
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
                  <Square num={v.num} visible={v.visible} />
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
                        <Square num={v.num} visible={v.visible} />
                      </Col>
                    </Row>)
                }
              })
            }
          </Col>

          {/* main box */}
          <Col span={20} className='col-item'>
            <Info />
            <Turn />
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
                        <Square num={v.num} visible={v.visible} />
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
                  <Square num={v.num} visible={v.visible} />
                </Col>)
              }
            })
          }
        </Row>

      </div>
    )
  }
}