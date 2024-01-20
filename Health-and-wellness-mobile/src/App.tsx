import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { apps, home, aperture, help, square } from 'ionicons/icons'
import { Resources, Home, Guide, FAQ, Techniques } from './views/tabs'

import { Provider } from "mobx-react"
import { create } from "mobx-persist"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'



/* Theme variables */
import './theme/variables.scss'

//stores
import Store from './stores/store'
import PreferencesStore from './stores/preferences_store'
import DataStore from './stores/data_store'

//This allows to setup ionic
setupIonicReact();

//create an instance of each store to add to the common store directory in the app
const preferencesStore = new PreferencesStore()
const dataStore = new DataStore()

const App: React.FC = () => {

  //create a store to hold all store directories
  const hydrate = create({})
  const store = new Store(preferencesStore, dataStore)

  hydrate("store", store)

  return (
    <Provider store={store} >
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} />
              <Route path="/guide" component={Guide} />
              <Route path="/faq" component={FAQ} />
              <Route path="/resources" component={Resources} exact={true} />
              <Route path="/techniques" component={Techniques} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="Home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Guide" href="/guide">
                <IonIcon icon={apps} />
                <IonLabel>Guide</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Techniques" href="/techniques">
                <IonIcon icon={aperture} />
                <IonLabel>Techniques</IonLabel>
              </IonTabButton>
              <IonTabButton tab="FAQ" href="/faq">
                <IonIcon icon={help} />
                <IonLabel>FAQ</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Resources" href="/resources">
                <IonIcon icon={square} />
                <IonLabel>Resources</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </Provider>
  )
}

export default App
