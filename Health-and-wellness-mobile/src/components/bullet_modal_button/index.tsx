import React from "react"
import Button from "../button"
import { observer } from "mobx-react"
import { action, observable } from "mobx"
import BulletModal from "../bullet_modal"

export interface Props {
    header?: string
    content?: {}
}

@observer
export default class BulletModalButton extends React.Component<Props> {

    @observable private modalVisible: boolean = false

    public render() {
        return (
            <div>
                <Button className="emergencySectionButton" onClick={this.handleOpenModal} fillWidth={true}>
                    <span className="buttonText">{this.props.header}</span>
                </Button>
                {this.modalVisible ?
                    <div className="emergency-modal-content">
                        <BulletModal modalHeader={this.props.header} modalContent={this.props.content} onToggleVisible={this.handleToggleModalVisible} />
                    </div>
                    : null
                }
            </div>
        )
    }

    @action
    private handleOpenModal = () => {
        this.handleToggleModalVisible(true)
        this.forceUpdate()
    }

    @action
    private handleToggleModalVisible = (visible: boolean) => {
        this.modalVisible = visible
        this.forceUpdate()
    }
}