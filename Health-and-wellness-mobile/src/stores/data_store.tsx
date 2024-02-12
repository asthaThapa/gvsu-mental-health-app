import { computed } from 'mobx'
import { GuideTileInfo, HomeLinks, EmergencyInfo, FaqInfo, TechniqueInfo, ResourceCardInfo } from './models/data_models'

import SystemData from '../stores/data.json'


export default class DataStore {

    //Home view elements
    @computed
    public get homeView() {
        return SystemData.home
    }

    @computed
    public get homeTiles(): HomeLinks[] {
        return this.homeView.tiles
    }

    //guide view elements
    @computed
    public get guideView() {
        return SystemData.guide
    }

    @computed
    public get guideInfo(): GuideTileInfo[] {
        return this.guideView.tiles
    }

    @computed
    public get ofConcernTile() {
        return this.guideView.otherwiseOfConcern
    }

    // public guideResourceTiles(tile: GuideTileInfo) {
    //     let result: ResourceTile[] = [];
    //     tile.resourcesRelevant.forEach((item) => {
    //         this.resourceTiles.some((res) => {
    //             if (item.name === res.department) {
    //                 result.push(res);
    //                 return true;
    //             }
    //             return false;
    //         });
    //     });
    //     return result;
    // }

    //resource view elements
    @computed
    public get resourceView() {
        return SystemData.resource
    }

    // @computed
    // public get resourceTiles() {
    //     const tiles = this.resourceView.tiles
    //     return tiles.sort((a, b) => {
    //         return (a.department < b.department ? -1 : a.department > b.department ? 1 : 0)
    //     })
    // }

    //faq view elements
    @computed
    public get faqView() {
        return SystemData.faq
    }

    @computed
    public get faqTiles(): FaqInfo[] {
        return this.faqView.tiles
    }

    //emergency modal elements
    @computed
    public get emergencyModal() {
        return SystemData.emergency
    }

    @computed
    public get emergencyBusinessHourInfo(): EmergencyInfo {
        return this.emergencyModal.businessHours
    }

    @computed
    public get emergencyAfterHourInfo(): EmergencyInfo {
        return this.emergencyModal.afterHours
    }

    @computed
    public get emergencyRecievedRemotely(): EmergencyInfo {
        return this.emergencyModal.recievedRemotely
    }


    @computed
    public get emergencyDescriptionHeader() {
        return this.emergencyModal["description-header"]
    }

    @computed
    public get emergencyDescriptionBullets() {
        return this.emergencyModal["description-bullets"]
    }

    // @computed
    // public get emergencyDescriptionFooter() {
    //     return this.emergencyModal["description-footer"]
    // }

    @computed
    public get emergencyConcernHeader() {
        return this.emergencyModal["concern-header"]
    }

    @computed
    public get emergencyConcernBullets() {
        return this.emergencyModal["concern-bullets"]
    }

    //technique view elements

    @computed
    public get techniqueView(): TechniqueInfo {
        return SystemData.classRoomTechniques
    }

    //New Resources
    @computed
    public get resourceCardInfo(): ResourceCardInfo[] {
        return this.resourceView.tiles
    }
}
