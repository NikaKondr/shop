import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import EventManager from '../../utils/EventManager';

import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShopStore from '../../store/ShopStore/Shop.store';
import PlayerStore from '../../store/PlayerStore';

import List from './components/List'
import Basket from './components/Basket';
import Modal from './components/Modal';

import style from './shop.module.scss'

export interface IShopBasket { uuid: string, hash: string, name: string, price: number }
export type shopPages = 'list' | 'basket'

const Shop: React.FC<{ store: ShopStore, playerStore: PlayerStore }> = ( { store, playerStore } ) => {

    const [ currentCategory, setCurrentCategory ] = React.useState<number>( 0 ),
        [ page, setPage ] = React.useState<shopPages>( 'list' ),
        [ shopBasket, setShopBasket ] = React.useState<IShopBasket[]>( [] ),
        [ currentItemDelete, setCurrentItemDelete ] = React.useState<IShopBasket | null>( null ),
        [ showModal, setShowModal ] = React.useState<boolean>( false ),
        [ showButtonBuy, setShowButtonBuy ] = React.useState<boolean>( false );

    const screen = React.useRef<HTMLDivElement>( null );

    React.useEffect( () => {
        if ( store.isShow ) screen.current && screen.current.classList.add( style.main_active );
    }, [ store.isShow ] );

    const addShopBasket = React.useCallback( ( obj: IShopBasket ) => {
        if ( shopBasket.length + 1 > 0 ) setShowButtonBuy( true )
        if ( shopBasket.length + 1 > 20 ) {
            toast.error( "Привышен лимит", {
                toastId: 'limitError'
            } )
            return;
        };

        toast.success( "Товар добавлен в корзину", {
            autoClose: 1000,
            toastId: obj.hash
        } )
        setShopBasket( [ ...shopBasket, obj ] )

    }, [ shopBasket ] );

    const removeShopBasket = React.useCallback( ( obj: IShopBasket ) => {
        if ( currentItemDelete !== null ) return;
        if ( shopBasket.length - 1 === 0 ) setShowButtonBuy( false );
        setCurrentItemDelete( obj );

        const timeout = setTimeout( () => {
            let shopBasketCopy = [ ...shopBasket ];
            const arrFilter = shopBasketCopy.filter( item => item.uuid !== obj.uuid );
            setShopBasket( arrFilter );
            setCurrentItemDelete( null );
        }, 300 );

        return () => clearTimeout( timeout );

    }, [ shopBasket, currentItemDelete ] );

    React.useEffect( () => {
        if ( page === 'basket' ) {
            setCurrentCategory( -1 );

            if ( shopBasket.length === 0 ) {
                setCurrentCategory( 0 );
                setPage( 'list' )
            }
        }
    }, [ page, shopBasket.length ] );

    React.useEffect( () => {
        if ( showModal ) {
            if ( shopBasket.length === 0 ) setShowModal( false );
        }
    }, [ showModal, shopBasket.length ] );

    React.useEffect( () => {
        EventManager.addHandler( 'shop', ( value: { type: string, data: any } ) => {
            switch ( value.type ) {
                case 'setShow':
                    return store.setShow( value.data );
                case 'setName':
                    return store.setName( value.data );
                case 'setShop':
                    return store.setShop( value.data );

                default: return;
            }
        } );

        return () => EventManager.removeHandler( 'shop' );
    }, [ store ] )

    if ( !store.isShow ) return null;

    return <div ref={screen} className={style.main}>
        <ToastContainer
            containerId="app-notifications"
            transition={Flip}
            position="bottom-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            limit={3}
        />
        <div className={style.content}>
            <Modal playerStore={playerStore} {...{ showModal, setShowModal, shopBasket, setShopBasket, setShowButtonBuy }} />
            <div className={style.header}>
                <div className={style.__title}>{store.name}</div>
                <div className={style.__button} onClick={() => EventManager.trigger( 'shop', 'close' )} />
            </div>
            <div className={style.container}>
                <div className={style.navigation}>
                    {store.shop.map( ( el, key ) => {
                        return <div
                            key={key}
                            className={cn( style.box, currentCategory === el.id && style.box_active )}
                            onClick={() => { setCurrentCategory( el.id ); setPage( 'list' ) }}
                        >{el.name}</div>

                    } )}
                    <div
                        className={cn( style.__button, showButtonBuy && style.__button_active )}
                        onClick={() => setShowModal( true )}
                    >Оплатить</div>
                </div>
                {page === 'list' && <List store={store} {...{ currentCategory, addShopBasket, setPage, shopBasket }} />}
                {page === 'basket' && <Basket {...{ shopBasket, removeShopBasket, currentItemDelete }} />}
            </div>
        </div>
    </div>
}

export default observer( Shop );
