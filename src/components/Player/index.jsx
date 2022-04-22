import React, { Component } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

import './index.css'

export default class Player extends Component {
    render() {
        return (
            <div style={{ 'visibility': this.props.visible }}>
                <Avatar id='playerdefault' icon={<UserOutlined />} />
            </div>
        )
    }
}
