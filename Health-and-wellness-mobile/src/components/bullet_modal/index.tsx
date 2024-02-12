import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import Card from '../card/index';
import option from '../../assets/icons/emergency/options.png';
import tip from '../../assets/icons/emergency/tips.png';


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
        const imageArray = [option, tip];
        const cards = Object.entries(cardContent).map(([key, item], index) => {
            const components = {
                subheader: item.subHeader,
                body: item.description,
                isList: true,
                image: imageArray[index]
            };

            return (
                <div className="emergency-modal__description">
                    <Card
                        stretch={false}
                        styledComponents={components}
                        customStyle={true}
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



