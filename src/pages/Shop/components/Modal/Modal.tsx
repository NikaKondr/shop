import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { regExp } from '../../../../utils/regExp';
import EventManager from '../../../../utils/EventManager';
import { toast } from 'react-toastify';

import './Modal.scss'

interface IModal {
    store: any, playerStore: any, showModal: boolean,
    setShowModal: any, shopBasket: any, setShopBasket: any,
    setShowButtonBuy: any
}

const Modal: React.FC<IModal> = ( { store, playerStore, showModal, setShowModal, shopBasket, setShopBasket, setShowButtonBuy } ) => {
    const [ currentPayment, setCurrentPayment ] = React.useState( 'cash' );

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


    return <div className={cn( 'shop-content-modal', showModal && 'shop-content-modal_active' )}>
        <div className='shop-content-modal__title'>Выберите способ оплаты</div>
        <div className='shop-content-modal__money'>
            <span>В кошелке: {playerStore.playerState.money.cash.replace( regExp.money, '$1 ' )} $</span>
            <span>На карте: {playerStore.playerState.money.card.replace( regExp.money, '$1 ' )} $</span>
        </div>
        <div className='shop-content-modal__amount'>К оплате: <span>{String( getCartMoney() ).replace( regExp.money, '$1 ' )} $</span></div>
        <div className='shop-content-modal-payment'>
            <div
                className={cn( 'shop-content-modal-payment-box', currentPayment === 'cash' && 'shop-content-modal-payment-box_active' )}
                onClick={() => setCurrentPayment( 'cash' )}
            >Наличные</div>
            <div
                className={cn( 'shop-content-modal-payment-box', currentPayment === 'card' && 'shop-content-modal-payment-box_active' )}
                onClick={() => setCurrentPayment( 'card' )}
            >Карта</div>
        </div>
        <div className='shop-content-modal-buttons'>
            <div className='shop-content-modal-buttons-box' onClick={() => buyItems()}>Оплатить</div>
            <div className='shop-content-modal-buttons-box' onClick={() => setShowModal( false )}>Вернуться</div>
        </div>
    </div>
}

export default observer( Modal );
