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
        const descriptionLines = description.split('\n');
        return (
            <div>
                <ul>
                    {descriptionLines.slice(0).map((line, index) => {
                        const linkStartIndex = line.indexOf("[link");
                        const linkEndIndex = line.indexOf("]", linkStartIndex);

                        let linkDest = line.substr(
                            line.indexOf('[') + 5,
                            line.indexOf(']') - (line.indexOf('[') + 5),
                        );
                        let linkText = linkDest.substr(13);

                        if (linkDest.includes('placeholder: ')) {
                            linkText = linkDest.substr(linkDest.indexOf('placeholder: ') + 13);
                            linkDest = linkDest.substr(0, linkDest.indexOf('placeholder: ') - 2);
                        }
                        if (linkDest && linkText) {
                            return (
                                <li key={index}>
                                    {line.substring(0, linkStartIndex).replaceAll("-", "")}
                                    <a href={linkDest}>{linkText}</a>
                                    {line.substring(linkEndIndex + 1).trim()}
                                </li>
                            );
                        } else {
                            return <li key={index}>{line.replaceAll("-", "").trim()}</li>;
                        }
                    })}
                </ul>
            </div>
        );
    };


}
