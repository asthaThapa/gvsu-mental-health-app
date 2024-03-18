import React from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react'
import { classNames } from '../../utils/system'
import TextBlock from '../text_block'

import './index.scss'

export type ButtonType = "button" | "reset" | "submit"

export interface cardProps {
    title?: string
    stretch: boolean
    children?: React.ReactNode
    styledComponents?: Record<string, any>;
    customStyle: boolean
    emergencyInfo: boolean
}

export default class Card extends React.Component<cardProps> {

    public static defaultProps = {
        stretch: false,
        title: '',
        customStyle: false,
        emergencyInfo: false
    }

    public render() {

        const { title, stretch, styledComponents, customStyle, emergencyInfo } = this.props

        var cardClass = classNames('card', [
            {
                name: 'card__stretch',
                include: stretch
            },
            {
                name: 'emergency-modal_card',
                include: customStyle
            },
            {
                name: 'emergency_info_card',
                include: emergencyInfo
            }

        ])

        return (
            <IonCard className={cardClass}>
                {
                    title !== '' ?
                        <IonCardHeader>
                            <IonCardTitle>{title}</IonCardTitle>  </IonCardHeader>
                        : null
                }
                <IonCardContent>
                    {styledComponents ? this.renderStyledComponents(styledComponents) : this.props.children}
                </IonCardContent>
            </IonCard>
        )
    }

    private renderStyledComponents(components: any) {
        const isList = components.isList ? true : false
        return (
            <div className="styled-card-components">
                <div {...isList ? { className: 'card-list' } : { className: 'card-description' }}>
                    <IonImg className="card-image emergency-phone" src={components.image} />
                    <div {...isList ? { className: 'card-text' } : { className: 'card-description-text' }}>
                        {components.header ? <h1 className='card-header'>{components.header}</h1> : null}
                        <h2 className='card-subheader'>{components.subheader}</h2>
                    </div>
                </div>
                {this.renderDescription(components.body, isList)}
            </div >
        )
    }

    private renderDescription(description: string, isList: boolean) {
        if (isList) {
            return (
                <p className='card-description-list'>
                    <TextBlock input={description} />
                </p>
            )
        } else {
            return (
                <p className='card-description'>{description}</p>
            )
        }
    }


}