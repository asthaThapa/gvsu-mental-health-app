import React from "react"
import Store from "../stores/store"
import View from "./view_models/view"
import { inject, observer } from "mobx-react"
import ScrollTile from "../components/scroll_tile"
import { IonImg } from '@ionic/react';
import homePageImg from '../assets/home.png'

import './views.scss'

export interface ViewProps {
    store: Store
}

@inject('store')
@observer
export default class HomeView extends React.Component<ViewProps> {

    public static defaultProps = {
        store: null
    }

    public render() {
        const tiles = this.props.store.data.homeTiles
        const body = (
            <div className="home-view">

                <div className="home-view-header_image">
                    <IonImg src={homePageImg} />
                </div>

                <div className="home-view__wrappers ">
                    <ScrollTile open={false} label={tiles[0].label} link={tiles[0].link} homeView={true} />
                    <ScrollTile open={false} label={tiles[1].label} link={tiles[1].link} homeView={true} />
                    <div className="home-view__dock">
                        <ScrollTile open={false} label={tiles[3].label} link={tiles[3].link} homeView={true} />
                        <ScrollTile open={false} label={tiles[4].label} link={tiles[4].link} homeView={true} />
                    </div>
                </div>
            </div>
        )
        return (
            <View title="Mental Health Guide" body={body} route="/home" />
        )
    }
}
