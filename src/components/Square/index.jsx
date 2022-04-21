import React, { Component } from 'react'
import { Card } from 'antd'

import './index.css'

// 地图中每个格子组件
export default class Square extends Component {
    render() {
        return (
            <Card title="地点名称" bordered={false} className="Square">
                <div>内容</div>
            </Card>
        )
    }
}
