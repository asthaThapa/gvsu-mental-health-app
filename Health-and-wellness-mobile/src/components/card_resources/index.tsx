import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonImg,
  IonChip,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { call, mail, link } from 'ionicons/icons';
import { observer } from 'mobx-react';
import Modal from '../modal';

import './index.scss';

export interface ResourceCardProps {
  title: string;
  iconImage?: string;
  onClick?: () => void;
  open: boolean;
  enableModal?: boolean;
  onToggleOpen?: (open: boolean) => void;
  children?: React.ReactNode
  subResources?: boolean

}

@observer
export default class ResourceCard extends React.Component<ResourceCardProps> {
  public static defaultProps = {
    enableModal: false,
    onOpen: () => { }
  };

  public render() {
    const { title, subResources } = this.props;

    return (
      <>
        <div onClick={this.handleOpenTile}>
          <div>
            {subResources ? this.renderSubResources(this.props) : this.renderMainResources(this.props)}
          </div>
        </div>

        {this.props.open && this.props.enableModal ? (
          <Modal
            showModal={true}
            onToggleModalVisible={this.handleClick}
            header={title}
          >
            <div className="scroll-tile__modal">{this.props.children}</div>
          </Modal>
        ) : null}
      </>
    );
  }

  private handleOpenTile = () => {
    this.handleClick(true);
  };

  private handleClick = (visible: boolean) => {
    const { onClick, enableModal, onToggleOpen } = this.props;
    if (onClick) {
      onClick();
    }
    if (enableModal && onToggleOpen) {
      onToggleOpen(visible);
    }
  };

  private renderSubResources = (item: ResourceCardProps) => {
    return (
      <IonCard className="resource_card subresource_card">
        <IonGrid>
          {/* <IonRow className='subresource_card_row'>
            <IonCol size="auto">
              <IonImg className='subresource_card_icon' src={item.iconImage} />
            </IonCol>
          </IonRow> */}
          <IonRow className='subresource_card_row'>
            <IonCol>
              <IonCardTitle className="subresource_card_title">{item.title}</IonCardTitle>
            </IonCol>
          </IonRow>
          <IonRow className='subresource_card_row'>
            <IonCol size="auto">
              <IonLabel className='subresource_email'>xyz@gmail.com</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow className="subresource_phone_web_row">
            <IonCol size="auto">
              <IonChip className="subresource_chip" color="primary">
                <IonIcon icon={call}></IonIcon>
                <IonLabel>616-654-5564</IonLabel>
              </IonChip>
            </IonCol>
            <IonCol className="subresource_chip" size="auto">
              <IonChip color="primary">
                <IonIcon icon={link}></IonIcon>
                <IonLabel>Website</IonLabel>
              </IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    )
  }

  private renderMainResources = (item: ResourceCardProps) => {
    return (
      <IonCard className="resource_card">
        <div className='resource_card_image'>
          <IonImg className='resource_card_icon' src={item.iconImage} />
        </div>
        <IonCardHeader className='resource_card_header'>
          <IonCardTitle className="resource_card_title">{item.title}</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    )
  }
}
