import React from "react"
import { observer } from "mobx-react"
import { action, observable } from "mobx"
import ChatBotModal from "../chatbot_modal"
import { chatbubble } from 'ionicons/icons'
import { IonIcon } from "@ionic/react"
import { IonButton } from '@ionic/react'

@observer
export default class ChatBotButton extends React.Component {

    @observable private modalVisible: boolean = false

    public render() {
        return (<>
            <IonButton className='chatbotButton' onClick={this.handleOpenModal}>
                <IonIcon className='chatbotIcon' icon={chatbubble} size="large" />
            </IonButton>
            {this.modalVisible ?
                <ChatBotModal onToggleVisible={this.handleToggleModalVisible} /> : null
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