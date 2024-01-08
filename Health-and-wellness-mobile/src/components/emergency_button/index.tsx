import React from "react"
import Button from "../button"
import {observer } from "mobx-react"
import { action, observable } from "mobx"
import EmergencyModal from "../emergency_modal"

@observer
export default class EmergencyButton extends React.Component {

    @observable private modalVisible: boolean = false

    public render() {
        return (<>
            <Button onClick={this.handleOpenModal} fillWidth={true} type="emergency">
                I have an Emergency
          </Button>
          { this.modalVisible ?
           <EmergencyModal onToggleVisible={this.handleToggleModalVisible}/> : null
          }
          </>
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