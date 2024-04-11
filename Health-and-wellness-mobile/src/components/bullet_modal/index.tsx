import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import Card from '../card/index';
import pointIcon from '../../assets/icons/emergency/options.png';

export interface Props {
    onToggleVisible: (visible: boolean) => void
    modalHeader?: string
    modalContent?: {}
    store: Store
}

@inject('store')
@observer
export default class BulletModal extends React.Component<Props> {

    public static defaultProps = {
        store: null
    }

    public render() {
        return (
            <Modal
                classname="emergency-modal"
                showModal={true}
                onToggleModalVisible={this.toggleModal}
                header={this.props.modalHeader}
                sheetModal={true}
            >
                <div className="emergency-modal-bullet-content">
                    <div>
                        {this.props.modalContent &&
                            this.createCard(this.props.modalContent)}
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

    private createCard(cardContent: { [key: string]: { subHeader: string; description: string } }) {
        const cards = Object.entries(cardContent).map(([key, item], index) => {

            const components: { subheader?: string; body: string; isList: boolean; image?: string } = {
                body: item.description,
                isList: true
            };

            if (item.subHeader !== "(header)") {
                components.subheader = item.subHeader;
                components.image = pointIcon;
            }

            return (
                <div className="emergency-modal__description">
                    <Card
                        stretch={false}
                        styledComponents={components}
                        emergencyInfo={true}
                    />

                </div>
            );
        });

        return (
            <>
                {cards}
            </>
        );
    }

}



