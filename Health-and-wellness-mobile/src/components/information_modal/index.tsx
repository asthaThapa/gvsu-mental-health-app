import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import TextBlock from "../text_block"
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import {
    IonBackdrop
} from '@ionic/react';

import "./index.scss"

export interface Props {
    store: Store
    header: string
    body: string
}

interface Section {
    title: string;
    description: string;
}


@inject('store')
@observer
export default class InformationModal extends React.Component<Props> {

    public static defaultProps = {
        store: null,
        header: '',
        body: ''
    }

    public render() {
        const { header, body } = this.props;
        const parsedContent = this.getParsedContent(body)

        const bulletPoints = parsedContent.map((item: Section, index: number) => {
            return (
                <IonCardHeader key={index}>
                    <IonCardTitle className="informationHeader">{item.title}</IonCardTitle>
                    <IonCardContent className="informationContent">{this.getDescription(item.description)}</IonCardContent>
                </IonCardHeader>
            );
        });

        return (
            <>
                <IonBackdrop visible={true} />
                <Modal classname="information-modal" showModal={true} header={header} informationModel={true}>
                    <div className="information-container">
                        <div>
                            <IonCard>
                                {bulletPoints}
                            </IonCard >
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

    public getParsedContent(contentString: string) {
        const sections: string[] = contentString.split('[header ');
        const data: Section[] = [];
        sections.forEach((section, index) => {
            if (section.trim() !== '') {
                const headerEndIndex: number = section.indexOf(']');
                const header: string = section.slice(0, headerEndIndex);
                let content: string = section.slice(headerEndIndex + 1).trim();
                data.push({
                    title: header.trim(),
                    description: content.replace('-', '').trim()
                });
            }
        });
        console.log(data)
        return data;
    }

    public getDescription = (description: string) => {
        const descriptionLine = description.split('\n');

        return (
            <div>
                <span>{descriptionLine[0]}</span>
                <ul>
                    {descriptionLine.slice(1).map((line, index) => (
                        <li key={index}>{line.replaceAll("-", "").trim()}</li>
                    ))}
                </ul>
            </div>
        );
    };

}
