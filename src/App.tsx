import React from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import EventManager from './utils/EventManager';

import Shop from './pages/Shop';
import ShopStore from './store/ShopStore';
import PlayerStore from './store/PlayerStore';


const App = () => {
    const shopStore = useLocalObservable( () => new ShopStore() ),
        playerStore = useLocalObservable( () => new PlayerStore() );

    React.useEffect( () => {
        EventManager.addHandler( 'player', ( value: any ) => {
            switch ( value.type ) {
                case 'setPlayerState':
                    return playerStore.setPlayerState( value.data );
                default: return;
            }
        } );

        return () => EventManager.removeHandler( 'player' );
    }, [ playerStore ] )

    return (
        <div className="app">
            <Shop store={shopStore} playerStore={playerStore} />
        </div>
    );
}

export default App;
