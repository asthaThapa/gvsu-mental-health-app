import React from 'react';
import { inject, observer } from 'mobx-react';
import View from './view_models/view';
import ScrollTile from '../components/scroll_tile';
import Store from '../stores/store';
import { GuideTileInfo } from '../stores/models/data_models';
import ResourceSlideDock from '../components/resource_slider_dock';
import TextBlock from '../components/text_block';
import { observable, action } from 'mobx';
import VideoPreview from '../components/video_player';
import EmergencyButton from '../components/emergency_button';
import { IonIcon } from '@ionic/react';
import { arrowBack, arrowDown } from 'ionicons/icons';
import InformationModal from '../components/information_modal';

import anxious from '../assets/icons/guide/1.png';
import depressed from '../assets/icons/guide/2.png';
import sucidal from '../assets/icons/guide/3.png';
import threatening from '../assets/icons/guide/4.png';
import unusalBehavior from '../assets/icons/guide/5.png';
import otherwise from '../assets/icons/guide/otherwise.png';
import panic from '../assets/icons/guide/panic.png';

const imageArray = [anxious, depressed, sucidal, threatening, unusalBehavior]

export interface ViewProps {
  store: Store;
}

export interface GuideTile {
  info: GuideTileInfo;
  open: boolean;
  bodyOpen: boolean;
  warningSignsOpen: boolean;
  dosAndDontsOpen: boolean;
  resourcesRelevantOpen: boolean;
}

@inject('store')
@observer
export default class GuideView extends React.Component<ViewProps> {
  @observable private tiles: GuideTile[] = this.props.store.data.guideInfo.map(
    (item) => {
      return {
        info: item,
        open: false,
        bodyOpen: false,
        warningSignsOpen: false,
        dosAndDontsOpen: false,
        resourcesRelevantOpen: false,
      };
    },
  );

  @observable
  private ofConcernTiles = this.props.store.data.ofConcernTile.tiles.map(
    (tile) => {
      return {
        info: tile,
        open: false,
      };
    },
  );

  @observable private ofConcernOpen: boolean = false;

  public static defaultProps = {
    store: null,
  };

  public render() {
    const body = (
      <>
        {this.renderGuideTiles()}
        {this.renderOfConcernTile()}
      </>
    );
    return <View title="I have a student who...." body={body} route="/home" />;
  }

  private renderGuideTiles() {
    return this.tiles.map((tile, idx) => {
      return (
        <ScrollTile
          open={tile.open}
          subscript={tile.info.subscript}
          label={tile.info.label}
          enableModal={true}
          key={idx}
          onToggleOpen={this.handleToggleModal(tile)}
          iconImage={imageArray[idx]}
        >
          <div className="guide-view__modal">
            <TextBlock input={tile.info.description} />
          </div>
          <div className="guide-view__modal">{this.renderVideo(tile.info)}</div>
          {tile.info.secundaryBody ? (
            <div className="guide-view__modal">
              <TextBlock input={tile.info.secundaryBody} />
            </div>
          ) : null}
          {tile.info.body ? this.renderBody(tile) : null}
          <div>
            <div
              className="guide-view__modal-header"
              onClick={this.handleToggleWarningSignsOpen(tile)}
            >
              Warning Signs
              {tile.warningSignsOpen ? (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowDown}
                />
              ) : (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowBack}
                />
              )}
            </div>
            {tile.warningSignsOpen ? (
              <div className="guide-view__modal">
                {this.renderWarningSigns(tile.info)}
              </div>
            ) : null}
          </div>
          <div>
            <div
              className="guide-view__modal-header"
              onClick={this.handleToggleDosAndDontsOpen(tile)}
            >
              {"Do's & Don'ts"}
              {tile.dosAndDontsOpen ? (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowDown}
                />
              ) : (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowBack}
                />
              )}
            </div>
            {tile.dosAndDontsOpen ? (
              <div>{this.renderDosDonts(tile.info)}</div>
            ) : null}
          </div>
          <div>
            <div className="guide-view__modal-header" onClick={this.handleToggleResourcesRelevantOpen(tile)}>
              Relevant Resources
              {tile.resourcesRelevantOpen ? (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowDown}
                />
              ) : (
                <IonIcon
                  className="guide-view__modal-caret "
                  icon={arrowBack}
                />
              )}
            </div>
            {tile.resourcesRelevantOpen ? (
              <div>{this.renderResources(tile)}</div>
            ) : null}
          </div>
          <div className="view-emergency">
            <EmergencyButton />
          </div>
          <div className="view-footer">
            <span>
              University Counseling <br /> Center Information
            </span>
          </div>
        </ScrollTile>
      );
    });
  }

  private renderOfConcernTile() {
    const tile = this.props.store.data.ofConcernTile;
    const buttons = this.ofConcernTiles.map((item, idx) => {
      var modalBody = this.renderInformationModel(item.info.header, item.info.body);
      return (
        <ScrollTile
          open={item.open}
          label={item.info.header}
          enableDropdown={true}
          key={idx}
          onClick={this.handleToggleInnerConcern(item)}
        >
          <div className="faq-view__dropdown">
            {modalBody}
          </div>
        </ScrollTile>
      );
    });
    return (
      <ScrollTile
        open={this.ofConcernOpen}
        subscript={tile.subscript}
        label={tile.header}
        enableModal={true}
        onToggleOpen={this.handleToggleConcernTile}
        iconImage={otherwise}
      >
        {buttons}
      </ScrollTile>
    );
  }

  private renderVideo(tile: GuideTileInfo) {
    if (!tile.videoLink) {
      return;
    }

    return <VideoPreview video={tile.videoLink} />;
  }

  private renderWarningSigns(tile: GuideTileInfo) {
    if (!tile.warningSigns) {
      return;
    }
    const primeSigns = tile.warningSigns.primarySigns.map((sign, idx) => {
      return (
        <li className="guide-view__warning-signs" key={idx}>
          {sign}
        </li>
      );
    });

    const secondarySigns = tile.warningSigns.secondarySigns.map((sign, idx) => {
      return (
        <li className="guide-view__warning-signs" key={idx}>
          {sign}
        </li>
      );
    });

    return (
      <>
        {primeSigns.length > 0 ? (
          <>
            <div className="guide-view__modal-subheader">
              {tile.warningSigns.primaryHeader}
            </div>
            <ul>{primeSigns}</ul>
          </>
        ) : null}

        {secondarySigns.length > 0 ? (
          <>
            <div className="guide-view__modal-subheader">
              {tile.warningSigns.secondaryHeader}
            </div>
            <ul>{secondarySigns}</ul>
          </>
        ) : null}
      </>
    );
  }

  private renderBody(tile: GuideTile) {

    if (!tile.info.body) {
      return;
    }

    return this.renderInformationScrollTile('Panic Attack', tile, panic);
  }

  private renderInformationScrollTile(header: string, tile: any, iconImage: string) {
    const modalBody = this.renderInformationModel('Panic Attack', tile.info.body!.body);
    return (
      <ScrollTile
        open={tile.bodyOpen}
        label={tile.info.body!.header}
        onClick={this.handleToggleBodyOpen(tile)}
        enableDropdown={true}
        iconImage={panic}
      >
        <div className="faq-view__dropdown">
          {modalBody}
        </div>
      </ScrollTile>
    );
  }

  private renderInformationModel(header: string, body: string) {
    return <InformationModal header={header} body={body} />
  }

  private renderDosDonts(tile: GuideTileInfo) {
    const slides = tile.dosDonts.map((item, idx) => {
      const doBull = item.doBullets.map((d, num) => {
        return (
          <li key={num} className="guide-view__modal-bullets">
            {d}
          </li>
        );
      });
      const dontBull = item.dontBullets.map((d, num) => {
        return (
          <li key={num} className="guide-view__modal-bullets">
            {d}
          </li>
        );
      });
      return (
        <div key={idx}>
          <div className="guide-view__modal-text guide-view__do">
            <div>
              <div className="guide-view__modal-subheader">Do</div>
              {item.do}
            </div>
            <ul>{doBull}</ul>
            {item.doLast !== undefined ? (
              <TextBlock input={item.doLast} />
            ) : null}
          </div>
          <div className="guide-view__modal-text guide-view__dont">
            <div>
              <div className="guide-view__modal-subheader">Don't</div>
              {item.dont}
            </div>
            <ul>{dontBull}</ul>
          </div>
        </div>
      );
    });

    return <div>{slides}</div>;
  }

  private renderResources(tile: GuideTile) {
    const resources = this.props.store.data.guideResourceTiles(tile.info);
    return (
      <ResourceSlideDock
        resources={resources}
        tile={tile.info}
        onCloseModal={this.handleCloseModal(tile)}
        stretchCards={true}
      />
    );
  }

  @action
  private handleToggleConcernTile = (open: boolean) => {
    this.ofConcernOpen = open;
    this.forceUpdate();
  };

  @action
  private handleToggleInnerConcern = (tile: any) => {
    return () => {
      if (tile.open) {
        tile.open = false;
      } else {
        this.ofConcernTiles.forEach((t) => {
          t.open = false;
        });
        tile.open = true;
      }
      this.forceUpdate();
    };
  };

  @action
  private handleToggleOpen(tile: GuideTile, open: boolean) {
    tile.open = open;
    this.forceUpdate();
  }

  @action
  private handleToggleWarningSignsOpen = (tile: GuideTile) => {
    return () => {
      tile.warningSignsOpen = !tile.warningSignsOpen;
      this.forceUpdate();
    };
  };
  @action
  private handleToggleDosAndDontsOpen = (tile: GuideTile) => {
    return () => {
      tile.dosAndDontsOpen = !tile.dosAndDontsOpen;
      this.forceUpdate();
    };
  };
  @action
  private handleToggleResourcesRelevantOpen = (tile: GuideTile) => {
    return () => {
      tile.resourcesRelevantOpen = !tile.resourcesRelevantOpen;
      this.forceUpdate();
    };
  };
  @action
  private handleToggleBodyOpen = (tile: GuideTile) => {
    return () => {
      tile.bodyOpen = !tile.bodyOpen;
      this.forceUpdate();
    };
  };

  private handleToggleModal = (tile: GuideTile) => {
    return action((open: boolean) => {
      tile.open = open;
      this.forceUpdate();
    });
  };

  private handleCloseModal = (tile: GuideTile) => {
    return () => {
      this.handleToggleOpen(tile, false);
      this.forceUpdate();
    };
  };

  private onInfinite = (e: CustomEvent<void>) => {
    (e.target as HTMLIonInfiniteScrollElement).complete();
  };

}
