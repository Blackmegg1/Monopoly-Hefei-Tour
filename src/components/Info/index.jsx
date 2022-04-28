import React, { Component } from 'react'
import { List, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.css'


//在Main box中显示目前每个玩家的资产
export default class Info extends Component {
    render() {
        return (
            <div className='info'>
                <List
                    header={<div>玩家资产</div>}
                    bordered={true}
                    size='small'
                    itemLayout="horizontal"
                    dataSource={this.props.userData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={'Player' + (item.num + 1)}
                                description={`有${item.price}￥`}
                            />
                            <Tag icon={<UserOutlined />} color={item.userColor}>
                            </Tag>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
