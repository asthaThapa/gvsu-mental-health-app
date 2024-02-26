import React from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import { observer } from 'mobx-react';

import './index.scss';

export interface howToHelpCardProps {
    description?: string;
    body: any;
}

@observer
export default class HowToHelpCard extends React.Component<howToHelpCardProps> {

    public render() {

        const bulletPoints = this.props.body.map((item: any, index: number) => {
            return (
                <IonCardHeader key={index} className='howToHelpCard'>
                    <IonCardTitle className='howToHelpTitle'>{item.title}</IonCardTitle>
                    <IonCardContent className='howToHelpContent'>{item.description}</IonCardContent>
                </IonCardHeader>
            );
        });

        return (
            <IonCard>
                {bulletPoints}
            </IonCard >
        );
    }
}
