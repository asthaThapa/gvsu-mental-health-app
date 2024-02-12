import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import { EmergencyInfo } from "../../stores/models/data_models"
import TextBlock from "../text_block"
import emergencyIcon from '../../assets/images/emergencyButton/emergency-phone.png';
import Card from '../card/index';
import BulletModalButton from "../bullet_modal_button"

import "./index.scss"

export interface Props {
    onToggleVisible: (visible: boolean) => void
    store: Store
}

@inject('store')
@observer
export default class EmergencyModal extends React.Component<Props> {

    public static defaultProps = {
        store: null
    }

    public render() {
        return (
            <Modal
                classname="emergency-modal"
                showModal={true}
                onToggleModalVisible={this.toggleModal}
                header="Emergency Support"
                sheetModal={true}
            >
                <div className="emergency-modal-content">
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

    private renderBody() {
        const data = this.props.store.data
        const during = data.emergencyBusinessHourInfo
        const after = data.emergencyAfterHourInfo
        const receivedRemotely = data.emergencyRecievedRemotely

        const cardContent = {
            header: "988",
            subheader: "Suicide and Crisis Lifeline",
            body: "Call or text 988 for immediate mental health support.",
            image: emergencyIcon
        };

        return (
            <>
                <Card stretch={false} styledComponents={cardContent} customStyle={true}></Card>
                {this.renderDescription()}
                {this.renderConcerned()}
                {this.renderSection(during)}
                {this.renderSection(after)}
                {this.renderSection(receivedRemotely)}
            </>
        )
    }

    private renderDescription() {
        const data = this.props.store.data
        const header = data.emergencyDescriptionHeader
        const bullets = data.emergencyDescriptionBullets

        return (
            <>
                <div className="emergency-modal__description">
                    <TextBlock input={header} />
                </div>
                <div className="emergency-modal__description">
                    <TextBlock input={bullets} />
                </div>
            </>
        )
    }

    private renderConcerned() {
        const data = this.props.store.data
        const header = data.emergencyConcernHeader
        return (
            <div className="emergency-modal__description">
                <div className="text-block-center">
                    <span>{header}</span>
                </div>
            </div>
        )
    }

    private renderSection(info: EmergencyInfo) {
        return (
            <div className="emergency-modal__">
                <BulletModalButton header={info.title} content={info.content} />
            </div>
        )
    }


}
