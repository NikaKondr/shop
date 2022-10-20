import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { regExp } from '../../../../utils/regExp';
import EventManager from '../../../../utils/EventManager';
import { toast } from 'react-toastify';

import style from './modal.module.scss'

import PlayerStore from '../../../../store/PlayerStore';
import { IShopBasket } from '../../Shop';

interface IModal {
    playerStore: PlayerStore, showModal: boolean,
    setShowModal: any, shopBasket: IShopBasket[], setShopBasket: any,
    setShowButtonBuy: any
}

type payment = 'cash' | 'card'

const Modal: React.FC<IModal> = ( { playerStore, showModal, setShowModal, shopBasket, setShopBasket, setShowButtonBuy } ) => {
    const [ currentPayment, setCurrentPayment ] = React.useState<payment>( 'cash' );

    const getCartMoney = () => {
        let sum = 0;
        for ( let money of shopBasket ) {
            sum += money.price;
        }
        return sum;
    }

    const buyItems = React.useCallback( () => {
        if ( currentPayment === 'cash' ) {
            if ( parseInt( playerStore.playerState.money.cash ) > getCartMoney() ) {
                EventManager.trigger( 'shop', 'buyItems', { payment: 'cash', items: shopBasket } );
                setShowModal( false );
                setShopBasket( [] );
                setShowButtonBuy( false );
                toast.success( "Покупка прошла успешно", {
                    toastId: 'purchaseСcompleted'
                } )

            } else {
                toast.error( "Недостаточно средств в кошельке", {
                    toastId: 'notMoneyOnCash'
                } )
            }
        } else {
            if ( parseInt( playerStore.playerState.money.card ) > getCartMoney() ) {
                EventManager.trigger( 'shop', 'buyItems', { payment: 'card', items: shopBasket } );
                setShowModal( false );
                setShopBasket( [] );
                setShowButtonBuy( false );
                toast.success( "Покупка прошла успешно", {
                    toastId: 'purchaseСcompleted'
                } )
            } else {
                toast.error( "Недостаточно средств на карте", {
                    toastId: 'notMoneyOnCard'
                } )
            }
        }
    }, [ shopBasket, currentPayment ] ) // eslint-disable-line


    return <div className={cn( style.main, showModal && style.main_active )}>
        <div className={style.__title}>Выберите способ оплаты</div>
        <div className={style.__money}>
            <span>В кошелке: {playerStore.playerState.money.cash.replace( regExp.money, '$1 ' )} $</span>
            <span>На карте: {playerStore.playerState.money.card.replace( regExp.money, '$1 ' )} $</span>
        </div>
        <div className={style.__amount}>К оплате: <span>{String( getCartMoney() ).replace( regExp.money, '$1 ' )} $</span></div>
        <div className={style.payment}>
            <div
                className={cn( style.box, currentPayment === 'cash' && style.box_active )}
                onClick={() => setCurrentPayment( 'cash' )}
            >Наличные</div>
            <div
                className={cn( style.box, currentPayment === 'card' && style.box_active )}
                onClick={() => setCurrentPayment( 'card' )}
            >Карта</div>
        </div>
        <div className={style.buttons}>
            <div className={style.box} onClick={() => buyItems()}>Оплатить</div>
            <div className={style.box} onClick={() => setShowModal( false )}>Вернуться</div>
        </div>
    </div>
}

export default observer( Modal );
