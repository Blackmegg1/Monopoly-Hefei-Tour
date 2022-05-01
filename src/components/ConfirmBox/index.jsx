import React, { Component } from 'react'
import { Modal } from 'antd'

export default class index extends Component {

    render() {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.confirmBoxVisible}
                    onOk={() => this.props.changeConfirmBoxVisible(false)}
                    onCancel={() => this.props.changeConfirmBoxVisible(false)}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}
