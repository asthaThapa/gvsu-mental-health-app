import React, { createRef } from "react";
import { inject, observer } from "mobx-react";
import Modal from "../modal";
import Store from "../../stores/store";
import { IonCol, IonGrid, IonRow, IonImg, IonInput } from '@ionic/react';
import bot from '../../assets/chatbotIcon.png';
import user from '../../assets/user.png';
import send from '../../assets/send.png';
import "./index.scss";
import { getCohereEmbeds } from "../../retrievalModel";
import { IonFooter, IonContent } from '@ionic/react'

export interface Props {
    onToggleVisible: (visible: boolean) => void;
    store: Store;
}

interface State {
    chatHistory: Array<{ sender: string; message: string }>;
}

@inject('store')
@observer
export default class ChatBotModal extends React.Component<Props, State> {

    public static defaultProps = {
        store: null
    }

    private userInputRef: React.RefObject<HTMLIonInputElement>

    constructor(props: Props) {
        super(props);
        this.state = {
            chatHistory: [
                {
                    sender: "bot",
                    message: "Hi I am chatbot. How can I help you?"
                }
            ]
        };
        this.userInputRef = createRef<HTMLIonInputElement>();
    }

    public render() {
        return (
            <Modal
                classname="chatbot-modal"
                showModal={true}
                onToggleModalVisible={this.toggleModal}
                header="Chat"
                sheetModal={true}
                contentPage={false}
            >
                <IonContent>
                    <IonGrid>
                        {this.state.chatHistory.map((item, index) => (
                            <div key={index} className={`${item.sender}-message`}>
                                {item.sender === "bot" ?
                                    this.renderChatBotReply(item.message) :
                                    this.renderUserReply(item.message)}
                            </div>
                        ))}
                    </IonGrid>
                </IonContent>
                <IonFooter>
                    <IonGrid className="userMessage">
                        <IonRow>
                            <IonCol>
                                <IonInput
                                    ref={this.userInputRef}
                                    // onIonChange={(e) => {
                                    //     console.log("Input value:", e.detail.value);
                                    // }}
                                    label="Send Message"
                                    labelPlacement="floating"
                                    fill="outline"
                                    placeholder="Enter text"
                                ></IonInput>
                            </IonCol>
                            <IonCol size="auto">
                                <IonImg className="send-icon" src={send} onClick={() => this.handleSendMessage()} />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonFooter>
            </Modal>
        )
    }

    private toggleModal = (visible: boolean) => {
        if (this.props.onToggleVisible) {
            this.props.onToggleVisible(visible);
        }
    }

    private handleSendMessage = () => {
        const userInput = this.userInputRef.current?.value || "";
        const chatHistoryItem = { sender: "user", message: userInput };
        this.setState(prevState => ({
            chatHistory: [...prevState.chatHistory, { ...chatHistoryItem, message: chatHistoryItem.message.toString() }]
        }), async () => {
            await this.handleBotReply(userInput.toString());
            this.userInputRef.current!.value = "";
        });
    }

    private handleBotReply = async (userInput: string) => {
        try {
            const botReply = await getCohereEmbeds(userInput);
            const botReplyItem = { sender: "bot", message: botReply.toString() };

            this.setState(prevState => ({
                chatHistory: [...prevState.chatHistory, botReplyItem]
            }));
        } catch (error) {
            console.error("Error fetching bot reply:", error);
        }
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