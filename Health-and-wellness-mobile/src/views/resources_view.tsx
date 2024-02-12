import React from 'react'
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Store from '../stores/store'
import View from './view_models/view'
import {
  IonCol,
  IonGrid,
  IonRow,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import ResourceCard from '../components/card_resources';
import { ResourceCardInfo } from '../stores/models/data_models';

import imgPlaceholder from '../assets/gv_placeholder_logo.jpg';


export interface Props {
  store: Store
}

export interface ResourcesCardTile {
  info: ResourceCardInfo;
  open: boolean;
  bodyOpen: boolean;
}


@inject("store")
@observer
export default class ResourcesView extends React.Component<Props> {

  public static defaultProps = {
    store: null
  }

  @observable private tiles: ResourcesCardTile[] = this.props.store.data.resourceCardInfo.map(
    (item: ResourceCardInfo) => {
      return {
        info: item,
        open: false,
        bodyOpen: false
      };
    },
  );

  public render() {

    const body = (
      <>
        <IonGrid className='resources_grid'>
          {this.tiles.map((item: ResourcesCardTile, index) => {
            if (index % 2 === 0) {
              return (
                <IonRow key={index}>
                  <IonCol>{this.renderCard(item)}</IonCol>
                  {index + 1 < this.tiles.length && (
                    <IonCol>{this.renderCard(this.tiles[index + 1])}</IonCol>
                  )}
                </IonRow>
              );
            }
            return null;
          })}
        </IonGrid>
      </>
    )

    return (
      <View title="Resources" route="/resources" body={body} />
    )
  }

  private renderCard(item: ResourcesCardTile) {
    return (
      <ResourceCard
        open={item.open}
        enableModal={true}
        title={item.info.title}
        iconImage={imgPlaceholder}
        onToggleOpen={this.handleToggleModal(item)}
      >
        {this.renderResources(item.info.subResources)}
      </ResourceCard>
    )
  }

  private handleToggleModal = (tile: ResourcesCardTile) => {
    return action((open: boolean) => {
      tile.open = open;
      this.forceUpdate();
    });
  };

  private renderResources = (subresources: any) => {
    const body = (
      <>
        <IonGrid className='resources_grid'>
          {subresources.map((item: any, index: number) => {
            return (
              <IonRow key={index}>
                <IonCol>
                  <ResourceCard
                    open={false}
                    enableModal={false}
                    title={item.title}
                    iconImage={imgPlaceholder}
                  />
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </>
    )

    return (
      <>
        {body}
      </>
    )
  }

}

