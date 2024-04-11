import React from "react";
import { inject, observer } from "mobx-react";
import Modal from "../modal";
import Store from "../../stores/store";
import { IonCol, IonGrid, IonRow, IonImg, IonInput } from '@ionic/react';
import bot from '../../assets/chatbotIcon.png';
import user from '../../assets/user.png';
import send from '../../assets/send.png';
import "./index.scss";
import { getCohereEmbeds } from "../../retrievalModel";

export interface Props {
    onToggleVisible: (visible: boolean) => void;
    store: Store;
}

interface State {
    userInput: string;
    chatHistory: Array<{ sender: string; message: string }>;
}

@inject('store')
@observer
export default class ChatBotModal extends React.Component<Props, State> {

    public static defaultProps = {
        store: null
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            userInput: "",
            chatHistory: [
                {
                    sender: "bot",
                    message: "Hi I am chatbot. How can I help you?"
                }
            ]
        };
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
                <div className="chat-container">
                    <IonGrid className="chat-grid-container">
                        {this.state.chatHistory.map((item, index) => (
                            <div key={index} className={`${item.sender}-message`}>
                                {item.sender === "bot" ? this.renderChatBotReply(item.message) : this.renderUserReply(item.message)}
                            </div>
                        ))}
                    </IonGrid>
                </div>

                <div>
                    <IonGrid>
                        <IonRow className="user-input-container">
                            <IonCol>
                                <IonInput
                                    value={this.state.userInput}
                                    onIonChange={(e) => this.setState({ userInput: e.detail.value! })}
                                    label="Send Message"
                                    labelPlacement="floating"
                                    fill="outline"
                                    placeholder="Enter text"
                                ></IonInput>
                            </IonCol>
                            <IonCol size="auto">
                                <IonImg className="send-icon" src={send} onClick={this.handleSendMessage} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
            </Modal>
        )
    }

    private toggleModal = (visible: boolean) => {
        if (this.props.onToggleVisible) {
            this.props.onToggleVisible(visible);
        }
    }

    private handleSendMessage = async () => {
        const { userInput } = this.state;
        const coherenceResult = await getCohereEmbeds(userInput);
        const chatHistoryItem = { sender: "user", message: userInput };
        const botReplyItem = { sender: "bot", message: coherenceResult.toString() };

        this.setState(prevState => ({
            userInput: "",
            chatHistory: [...prevState.chatHistory, chatHistoryItem, botReplyItem]
        }));
    }

    private renderChatBotReply(botReply: string) {
        return (
            <IonRow>
                <IonCol size="auto" className="bot-container">
                    <IonImg className="bot-icon" src={bot} /></IonCol>
                <IonCol>
                    <div className="chat-bot-reply">
                        {botReply}
                    </div>
                </IonCol>
            </IonRow>
        )
    }

    private renderUserReply(userReply: string) {
        return (
            <IonRow>
                <IonCol>
                    <div className="chat-bot-reply">
                        {userReply}
                    </div>
                </IonCol>
                <IonCol size="auto" className="bot-container">
                    <IonImg className="bot-icon" src={user} /></IonCol>
            </IonRow>
        )
    }
}
