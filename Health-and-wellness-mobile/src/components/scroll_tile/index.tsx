import React from 'react';
import { IonRouterLink } from '@ionic/react';
import { classNames } from '../../utils/system';
import { observer } from 'mobx-react';
import Modal from '../modal';
import { IonImg } from '@ionic/react';

import './index.scss';

export interface ScrollTileProps {
  label: string;
  link?: string;
  subscript?: string;
  onClick?: () => void;
  enableModal?: boolean;
  enableDropdown?: boolean;
  open: boolean;
  onToggleOpen?: (open: boolean) => void;
  fillWidth: boolean;
  homeView: boolean;
  children?: React.ReactNode
  iconImage?: string;
}

@observer
export default class ScrollTile extends React.Component<ScrollTileProps> {
  public static defaultProps = {
    enableModal: false,
    fillWidth: false,
    onOpen: () => { },
    homeView: false,
  };

  public render() {
    const { label, fillWidth, link, subscript, homeView, iconImage } = this.props;
    const classes = classNames('scroll-tile', [
      { name: 'scroll-tile--fill', include: fillWidth },
      { name: 'scroll-tile__home', include: homeView },
    ]);

    const subscriptClass = subscript ? 'scroll-tile__heading' : '';
    const titleClass = homeView ? 'scroll-tile__home--title' : 'scroll-tile__feel-title';

    return (
      <>
        <div className={classes} onClick={this.handleOpenTile}>
          <div>
            <IonRouterLink routerLink={link ? link : undefined}>
              <div className="scroll-tile__button">
                {subscript ? (
                  <div className={subscriptClass}>
                    <div className="scroll-tile__subscript">{subscript}</div>
                  </div>
                ) : null}
                <div className={titleClass}>{label}</div>
              </div>
            </IonRouterLink>

            {/* {button ? (<Button onClick={this.handleOpenTile} className='genericButton'> Click Here </Button>) : null} */}
          </div>

          <div className="image-container">
            {iconImage ? (<IonImg src={iconImage} />) : null}
          </div>

          {this.props.open && this.props.enableDropdown ? (
            <div className="scroll-tile__dropdown">{this.props.children}</div>
          ) : null}
        </div>

        {this.props.open && this.props.enableModal ? (
          <Modal
            showModal={true}
            onToggleModalVisible={this.handleClickScrollTile}
            header={label}
          >
            <div className="scroll-tile__modal">{this.props.children}</div>
          </Modal>
        ) : null}
      </>
    );
  }

  private handleOpenTile = () => {
    this.handleClickScrollTile(true);
  };

  private handleClickScrollTile = (visible: boolean) => {
    const { onClick, enableModal, onToggleOpen } = this.props;
    if (onClick) {
      onClick();
    }
    if (enableModal && onToggleOpen) {
      onToggleOpen(visible);
    }
  };
}
