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
                                    onIonChange={(e) => {
                                        const inputValue = e.detail.value || ''; // Get the input value or an empty string
                                        const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9*? ]/g, ''); // Remove special characters except '*', '?', and space
                                        this.userInputRef.current!.value = sanitizedValue; // Update the input value through the ref
                                    }}
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
        const formattedReply = this.formatReply(botReply);

        return (
            <IonRow>
                <IonCol size="auto" className="bot-container">
                    <IonImg className="bot-icon" src={bot} />
                </IonCol>
                <IonCol>
                    <div className="chat-bot-reply">
                        {formattedReply}
                    </div>
                </IonCol>
            </IonRow>
        );
    }


    private formatReply(reply: string) {
        const formattedLinks = [];

        while (reply.includes('[link:')) {
            const startIndex = reply.indexOf('[link:');
            const endIndex = reply.indexOf(']', startIndex);

            if (endIndex !== -1) {
                const linkPart = reply.slice(startIndex + 6, endIndex);
                const parts = linkPart.split(', placeholder:');

                if (parts.length === 2) {
                    const url = parts[0].trim();
                    const text = parts[1].trim();

                    formattedLinks.push({ url, text });

                    reply = reply.slice(0, startIndex) + text + reply.slice(endIndex + 1);
                } else {
                    // If the format is not correct, remove the [link:] tag
                    reply = reply.slice(0, startIndex) + reply.slice(endIndex + 1);
                }
            } else {
                // If there is no closing bracket, remove the [link:] tag
                reply = reply.slice(0, startIndex) + reply.slice(startIndex + 6);
            }
        }

        let formattedReply = reply;

        formattedLinks.forEach(({ url, text }) => {
            const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
            const index = formattedReply.indexOf(text);
            if (index !== -1) {
                formattedReply = formattedReply.slice(0, index) + link + formattedReply.slice(index + text.length);
            }
        });

        return (
            <div className="formatted-reply" dangerouslySetInnerHTML={{ __html: formattedReply }} />
        );
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