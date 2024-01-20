import React from "react"
import { inject, observer } from "mobx-react"
import Modal from "../modal"
import Store from "../../stores/store"
import TextBlock from "../text_block"
import {
    IonBackdrop
} from '@ionic/react';

import "./index.scss"

export interface Props {
    store: Store
    header: string
    body: string
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
        return (
            <>
                <IonBackdrop visible={true} />
                <Modal classname="information-modal" showModal={true} header={header} informationModel={true}>
                    <div className="information-container">
                        <div>
                            <TextBlock input={body} />
                        </div>
                    </div>
                </Modal>
            </>
        )
    }

}
