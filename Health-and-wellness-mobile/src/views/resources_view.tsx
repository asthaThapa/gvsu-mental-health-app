import React from 'react'
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Store from '../stores/store'
import View from './view_models/view'
import {
  IonCol,
  IonGrid,
  IonRow,
  IonButton
} from '@ionic/react';
import ResourceCard from '../components/card_resources';
import { ResourceCardInfo } from '../stores/models/data_models';

import iconPlaceholder from '../assets/gv_placeholder_logo.jpg';
import environment from '../assets/icons/resources/resourceEnv.png'
import occupational from '../assets/icons/resources/resourceOcc.png'
import emotional from '../assets/icons/resources/resourceEmo.png'
import physical from '../assets/icons/resources/resourcePhy.png'
import social from '../assets/icons/resources/resourceSoc.png'
import financial from '../assets/icons/resources/resourceFin.png'
import spirtual from '../assets/icons/resources/resourceSpi.png'
import intellectual from '../assets/icons/resources/resourceInt.png'

const mainResIcons = [
  { name: 'resourceEnv', icon: environment },
  { name: 'resourceOcc', icon: occupational },
  { name: 'resourceEmo', icon: emotional },
  { name: 'resourcePhy', icon: physical },
  { name: 'resourceSoc', icon: social },
  { name: 'resourceFin', icon: financial },
  { name: 'resourceSpi', icon: spirtual },
  { name: 'resourceInt', icon: intellectual },
];

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
    let mainResource = this.tiles.find(tile => tile.info.id === 'emotionalResource');
    let ucc = mainResource ? mainResource.info.subResources.find(res => res.title === 'University Counseling Center') : null;

    const body = (
      <>
        <IonGrid className='resources_grid'>
          {ucc ?
            <IonRow>
              <IonCol>
                <ResourceCard
                  open={false}
                  enableModal={false}
                  title={ucc.title}
                  email={ucc.email}
                  phone={ucc.phone}
                  link={ucc.link}
                  subResources={true}
                />
              </IonCol>
            </IonRow> : null}

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

          <IonRow>
            <IonCol className='careReport'>
              <IonButton
                href="https://cm.maxient.com/reportingform.php?GrandValley&layout_id=2"
                target="_blank">
                <span>Create a CARE Report</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </>
    )

    return (
      <View title="Resources" route="/resources" body={body} />
    )
  }

  private renderCard(item: ResourcesCardTile) {
    var iconImg = mainResIcons.find(resource => resource.name === item.info.img)?.icon || iconPlaceholder;
    return (
      <ResourceCard
        open={item.open}
        enableModal={true}
        title={item.info.title}
        iconImage={iconImg}
        onToggleOpen={this.handleToggleModal(item)}
      >
        {this.renderSubResources(item.info.subResources)}
      </ResourceCard>
    )
  }

  private handleToggleModal = (tile: ResourcesCardTile) => {
    return action((open: boolean) => {
      tile.open = open;
      this.forceUpdate();
    });
  };

  private renderSubResources = (subresources: any) => {
    const body = (
      <>
        <IonGrid className='sub_resources_grid'>
          {subresources.map((item: any, index: number) => {
            return (
              <IonRow key={index}>
                <IonCol>
                  <ResourceCard
                    open={false}
                    enableModal={false}
                    title={item.title}
                    email={item.email}
                    phone={item.phone}
                    link={item.link}
                    subResources={true}
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


