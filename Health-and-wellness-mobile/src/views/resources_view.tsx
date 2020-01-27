
import React from 'react';
import View from './view_models/view';
import { IonList } from '@ionic/react';
import ScrollTile from '../components/scroll-tile';


export default class ResourcesView extends React.Component {

  public render() {
    const body = (
      <>
        <IonList lines="none">
          <div className="view-body">
            {this.renderBody()}
          </div>
        </IonList>
      </>
    )
    return (
      <View title="Resources" route="/resources" body={body} />
    )
  }

  private renderBody() {
    return (
      <>
        <ScrollTile label="Panic Attack" enableDropdown={true} />
        {/* <ScrollTile label="Suicidal Tendencies" enableDropdown={true} />
        <ScrollTile label="Excessive Absence" enableDropdown={true} />
        <ScrollTile label="Violent Outbursts" enableDropdown={true} />
        <ScrollTile label="Panic Attack" enableDropdown={true} />
        <ScrollTile label="Suicidal Tendencies" enableDropdown={true} />
        <ScrollTile label="Excessive Absence" enableDropdown={true} />
        <ScrollTile label="Violent Outbursts" enableDropdown={true} />
        <ScrollTile label="Panic Attack" enableDropdown={true} />
        <ScrollTile label="Suicidal Tendencies" enableDropdown={true} />
        <ScrollTile label="Excessive Absence" enableDropdown={true} />
        <ScrollTile label="Violent Outbursts" enableDropdown={true} /> */}

      </>)
  }
}
