import React from 'react'
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/react'
import { classNames } from '../../utils/system'

import './index.scss'

export type ButtonType = "button" | "reset" | "submit"

export interface cardProps {
    title?: string
    stretch: boolean
    children?: React.ReactNode
    styledComponents?: Record<string, String>;
    customStyle: boolean
}

export default class Card extends React.Component<cardProps> {

    public static defaultProps = {
        stretch: false,
        title: '',
        customStyle: false
    }

    public render() {

        const { title, stretch, styledComponents, customStyle } = this.props

        var cardClass = classNames('card', [
            {
                name: 'card__stretch',
                include: stretch
            },
            {
                name: 'emergency-modal_card',
                include: customStyle
            }

        ])

        return (
            <IonCard className={cardClass}>
                <IonCardHeader>
                    {
                        title !== '' ?
                            <IonCardTitle>{title}</IonCardTitle>
                            : null
                    }
                </IonCardHeader>
                <IonCardContent>
                    {styledComponents ? this.renderStyledComponents(styledComponents) : this.props.children}
                </IonCardContent>
            </IonCard>
        )
    }

    private renderStyledComponents(components: any) {
        return (
            <div className="styled-card-components">
                <IonImg className="card-image emergency-phone" src={components.image} />
                <h1 className='card-header'>{components.header}</h1>
                <h2 className='card-subheader'>{components.subheader}</h2>
                <p className='card-description'>{components.description}</p>
            </div>
        )
    }
}