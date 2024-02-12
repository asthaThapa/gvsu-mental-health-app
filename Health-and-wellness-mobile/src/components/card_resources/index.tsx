import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from '@ionic/react';
import { observer } from 'mobx-react';
import Modal from '../modal';

import './index.scss';

export interface ResourceCardProps {
  title: string;
  iconImage: string;
  onClick?: () => void;
  open: boolean;
  enableModal?: boolean;
  onToggleOpen?: (open: boolean) => void;
  children?: React.ReactNode

}

@observer
export default class ResourceCard extends React.Component<ResourceCardProps> {
  public static defaultProps = {
    enableModal: false,
    onOpen: () => { }
  };

  public render() {
    const { title, iconImage } = this.props;

    return (
      <>
        <div onClick={this.handleOpenTile}>
          <div>
            <IonCard className="resource_card">
              <div className='resource_card_image'>
                <IonImg className='resource_card_icon' src={iconImage} />
              </div>
              <IonCardHeader className='resource_card_header'>
                <IonCardTitle className="resource_card_title">{title}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
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
}
