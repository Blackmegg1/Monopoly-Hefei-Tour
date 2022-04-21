import React, { Component } from 'react'
import { List } from 'antd';

import './index.css'

const testData = [
    {
        title: 'Player1',
    },
    {
        title: 'Player2',
    },
    {
        title: 'Player3',
    },
    {
        title: 'Player4',
    },
];

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
                    dataSource={testData}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description="有50000￥"
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
