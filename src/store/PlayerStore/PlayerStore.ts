import {
    makeObservable,
    observable,
    action
} from "mobx";

interface IPlayerState {money: {cash: string, card: string}}


export default class PlayerStore {

    playerState: IPlayerState = {
        money: {
            cash: '900',
            card: '13000'
        }
    }

    constructor() {
        makeObservable(this, {
            playerState: observable,

            setPlayerState: action.bound
        });

    }

    setPlayerState(obj: any) {
        switch (obj.type) {
            case 'money':
                return this.playerState.money = obj.data;
            
        
            default: {
                return this.playerState = obj.data;
            }
        }
    }

}