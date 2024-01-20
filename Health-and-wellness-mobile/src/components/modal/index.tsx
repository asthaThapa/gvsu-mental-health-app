import React from 'react';
import {
  IonModal,
  IonIcon,
  IonHeader,
  IonTitle,
  IonButtons,
  IonToolbar,
  IonContent,
} from '@ionic/react';
import { close, information } from 'ionicons/icons';
import Button from '../button';
import 'animate.css';
import './index.scss';
import InformationModal from '../information_modal';

export interface ModalProps {
  header: string;
  showModal: boolean;
  forceModal: boolean;
  onToggleModalVisible?: (visible: boolean) => void;
  children?: React.ReactNode
  classname?: string
  informationModel?: boolean
  sheetModal?: boolean
}

export default class Modal extends React.Component<ModalProps> {

  public static defaultProps = {
    header: 'Sample',
    showModal: false,
    forceModal: false,
    classname: 'modal',
    informationModel: false,
    sheetModal: false
  };

  public render() {
    return (
      <IonModal
        className={this.props.classname}
        isOpen={this.props.showModal}
        backdropDismiss={false}
        initialBreakpoint={this.props.sheetModal ? 0.75 : 0.95}
        breakpoints={this.props.sheetModal ? [0.75, 0.75, 0.75, 1] : [0.95, 0.35, 0.99, 1]}
      >
        {!this.props.forceModal ? (
          <IonHeader className="modal-header-container" collapse="fade">
            <IonToolbar>
              <IonButtons slot="end" onClick={this.toggleModalVisible(false)}>
                <Button onClick={this.toggleModalVisible(false)} color='light' fill='clear'>
                  <IonIcon color="primary" icon={close} size={'large'} />
                </Button>
              </IonButtons>
              <IonTitle className='modal-title'>{this.props.header}</IonTitle>
            </IonToolbar>
          </IonHeader>
        ) : null}
        <IonContent fullscreen={true} >
          {this.props.children}
        </IonContent>
      </IonModal>
    );
  }

  private toggleModalVisible = (visible: boolean) => {
    const { onToggleModalVisible } = this.props;
    return () => {
      if (onToggleModalVisible) {
        onToggleModalVisible(visible);
      }
    };
  };


}
