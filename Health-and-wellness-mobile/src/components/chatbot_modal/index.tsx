import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import { IonCol, IonGrid, IonRow, IonImg, IonInput } from '@ionic/react';
import bot from '../../assets/chatbotIcon.png';
import user from '../../assets/user.png';
import send from '../../assets/send.png';
import "./index.scss"
import TextBlock from "../text_block";

export interface Props {
    onToggleVisible: (visible: boolean) => void
    store: Store
}

@inject('store')
@observer
export default class ChatBotModal extends React.Component<Props> {

    public static defaultProps = {
        store: null
    }

    public render() {
        return (
            <Modal
                classname="emergency-modal"
                showModal={true}
                onToggleModalVisible={this.toggleModal}
                header="Chat"
                sheetModal={true}
            >
                <div className="">
                    <div>
                        {this.renderBody()}
                    </div>
                </div>
            </Modal>
        )
    }

    private toggleModal = (visible: boolean) => {
        if (this.props.onToggleVisible) {
            this.props.onToggleVisible(visible)
        }
    }

    private botReply = this.renderChatBotReply()
    private userReply = this.renderUserReply()
    private userInput = this.renderUserInput()

    private renderBody() {
        return (
            <>
                <IonGrid className="chat-grid-container">
                    <div className="chat-content">
                        {this.botReply}
                        {this.userReply}
                    </div>
                    {this.userInput}
                </IonGrid>
            </>
        )
    }

    private renderChatBotReply() {
        return (
            <IonRow>
                <IonCol size="auto" className="bot-container">
                    <IonImg className="bot-icon" src={bot} /></IonCol>
                <IonCol>
                    <div className="chat-bot-reply">
                        Hi I am chatbot. How can I help you?
                    </div>
                </IonCol>
            </IonRow>
        )
    }

    private renderUserReply() {
        return (
        <IonRow>
            <IonCol>
                <div className="chat-bot-reply">
                    What services are provided at no cost to currently registered GVSU students?
                </div>
            </IonCol>
            <IonCol size="auto" className="bot-container">
                <IonImg className="bot-icon" src={user} /></IonCol>
        </IonRow>
        )
    }


    private renderUserInput() {
        return (

            <IonRow className="user-input-container">
                <IonCol>
                    <div className="user-input">
                        <IonInput label="Send Message" labelPlacement="floating" fill="outline" placeholder="Enter text"></IonInput>
                    </div>
                </IonCol>
                <IonCol size="auto" className="bot-container">
                    <IonImg className="bot-icon" src={send} /></IonCol>
            </IonRow>

        );
    }

}
