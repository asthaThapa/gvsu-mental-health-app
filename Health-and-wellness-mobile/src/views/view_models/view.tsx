import * as React from 'react'
import { IonToolbar, IonHeader, IonPage, IonContent, IonTitle, IonIcon } from '@ionic/react'
import { inject } from 'mobx-react'
import Store from '../../stores/store'
import EmergencyButton from '../../components/emergency_button'
import ChatBotButton from '../../components/chatButton'
import Modal from '../../components/modal'
import LoginView from '../login_view'
import { FirebaseContext } from '../../components/firebase'

import "./view.scss"

export interface ViewProps {
    title: string
    route: string
    body: React.ReactElement
    enableEmergencyModal: boolean
    store: Store
}

@inject('store')
export default class View extends React.Component<ViewProps> {

    public static defaultProps = {
        store: null,
        enableEmergencyModal: true
    }

    public render() {
        const { title, body } = this.props
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar >
                        <IonTitle className="view-title">{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent >
                    <div className="view-body">
                        {body}
                    </div>
                </IonContent>
                {/* <FirebaseContext.Consumer>
                    {firebase =>
                        <Modal showModal={!store.preferences.hasLoggedin} forceModal={true}>
                            <LoginView fbase={firebase} toggleVisible={this.toggleLoginModal} />
                        </Modal>
                    }
                </FirebaseContext.Consumer> */}
                <div className="footer-elements">
                    <div className="view-emergency">
                        <EmergencyButton />
                    </div>
                    <div className="view-footer">
                        <span>University Counseling <br /> Center Information</span>
                    </div>
                </div>

                <div className="chatbot-wrapper">
                    <ChatBotButton />
                </div>

            </IonPage>
        )
    }

    //private toggleLoginModal = () => {
    //const { store } = this.props
    //store.preferences.loginUser()
    //this.forceUpdate()
    //}
}
