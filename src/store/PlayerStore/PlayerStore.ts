import {
    makeObservable,
    observable,
    action
} from "mobx";

interface IPlayerState {
    money: { [ key: string ]: string }

}
export default class PlayerStore {

    playerState: IPlayerState = {
        money: {
            cash: '900',
            card: '13000'
        }
    }

    constructor () {
        makeObservable( this, {
            playerState: observable,

            setPlayerState: action.bound
        } );

    }

    setPlayerState( obj: { type: string, data: any } ) {
        switch ( obj.type ) {
            case 'money':
                return this.playerState.money = obj.data;


            default: {
                return this.playerState = obj.data;
            }
        }
    }

}