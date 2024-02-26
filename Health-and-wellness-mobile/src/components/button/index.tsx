import * as React from 'react'
import { IonButton, IonImg, IonAlert } from '@ionic/react'
import { classNames } from '../../utils/system'
import './index.scss' //scss import


export type ButtonType = 'icon' | 'standard' | 'tabs' | 'emergency' | 'alert'
export type ButtonColor = 'primary' | 'secondary' | 'danger' | 'light'
export type ButtonFill = 'solid' | 'outline' | 'clear'

export interface ButtonProps {
    type: ButtonType
    color: ButtonColor
    fill: ButtonFill
    busy: boolean
    fillWidth: boolean
    disabled?: boolean
    className?: string
    onClick?: () => void
    children?: React.ReactNode
    id?: string
    buttonHeader?: string
    buttonContent?: string
}

export default class Button extends React.Component<ButtonProps> {

    public static defaultProps = {
        type: 'standard',
        color: 'primary',
        fill: 'solid',
        busy: false,
        fillWidth: false
    }

    public render() {
        const { onClick, type, fillWidth, className, fill, color, id } = this.props

        const buttonClass = classNames('button-wrapper',
            [{ name: 'button-wrapper__fill-width', include: fillWidth },
            { name: className!, include: className !== null || className !== undefined },
            { name: 'button-wrapper__outline', include: fill === 'outline' }
            ])


        const fillVal = this.props.fill ? this.props.fill : "solid"

        if (type === 'standard') {
            return (
                <div className={buttonClass}>
                    <IonButton onClick={onClick} color={color} fill={fillVal}>
                        <span>{this.props.children}</span>
                    </IonButton>
                </div >
            )
        }

        else if (type === 'emergency') {
            return (
                <div className={buttonClass}>
                    <IonButton id={id} onClick={onClick} fill={fillVal} color={'danger'}>
                        <span className='emergencyText'>{this.props.children}</span>
                    </IonButton>
                </div >
            )
        }

        else if (type === 'icon') {
            return (
                <IonButton onClick={onClick} fill={fillVal} size="default">
                    {this.props.children}
                </IonButton>
            )
        }

        else if (type === 'alert') {
            const buttonText = this.props.buttonContent || '';
            const bulletPointText = this.changeToBulletText(buttonText);
            return (
                <div className={buttonClass}>
                    <IonButton id={this.props.id} color={color} fill={fillVal}>{this.props.buttonHeader}</IonButton>
                    <IonAlert
                        trigger={this.props.id}
                        header={this.props.buttonHeader}
                        message={bulletPointText}
                        buttons={[
                            {
                                text: 'ok',
                                cssClass: 'alert-button-confirm',
                            },
                        ]}
                    ></IonAlert>
                </div>
            );
        }
    }

    private changeToBulletText(textBlock: string) {
        if (!textBlock) {
            return ''; // Return an empty string if textBlock is undefined or empty
        }

        const lines = textBlock.split('\n');
        const bulletPoints = lines.map(line => `<li>${line.trim()}</li>`).join('\n');
        return `<ul>${bulletPoints}</ul>`;
    }
}