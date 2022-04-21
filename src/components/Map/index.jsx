import React, { Component } from 'react'
import { Col, Row } from 'antd'
import Square from '../Square'
import Info from '../Info'
import Turn from '../Turn'
import Dice from '../DiceBox'

import './index.css'


// 地图组件
export default class Map extends Component {

  render() {
    return (
      <div>
        <Row className="row">
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
        </Row>

        <Row className='row-center'>
          <Col span={2} >
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
          </Col>

          {/* main box */}
          <Col span={20} className='col-item'>
            <Info />
            <Turn />
            <Dice />
          </Col>


          <Col span={2}>
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
            <Row className='row'>
              <Col span={24} className='col-item'><Square /></Col>
            </Row>
          </Col>
        </Row>

        <Row className='row'>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
          <Col span={2} className='col-item'><Square /></Col>
        </Row>

      </div>
    )
  }
}