import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import EventManager from '../../utils/EventManager';

import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShopStore from '../../store/ShopStore';
import PlayerStore from '../../store/PlayerStore';

import List from './components/List'
import Basket from './components/Basket';
import Modal from './components/Modal';

import './Shop.scss'

const Shop: React.FC<{ store: ShopStore, playerStore: PlayerStore }> = ( { store, playerStore } ) => {
    const [ currentCategory, setCurrentCategory ] = React.useState( 0 ),
        [ page, setPage ] = React.useState( 'list' ),
        [ shopBasket, setShopBasket ] = React.useState<any[]>( [] ),
        [ currentItemDelete, setCurrentItemDelete ] = React.useState( null ),
        [ showModal, setShowModal ] = React.useState( false ),
        [ showButtonBuy, setShowButtonBuy ] = React.useState( false );

    const screen = React.useRef<any>( null );

    React.useEffect( () => {
        if ( store.isShow ) screen.current.classList.add( 'shop_active' );
    }, [ store.isShow ] );

    const addShopBasket = React.useCallback( ( obj: any ) => {
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

    const removeShopBasket = React.useCallback( ( obj: any ) => {
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
        EventManager.addHandler( 'shop', ( value: any ) => {
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

    return <div ref={screen} className='shop'>
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
        <div className='shop-content'>
            <Modal store={store} playerStore={playerStore} {...{ showModal, setShowModal, shopBasket, setShopBasket, setShowButtonBuy }} />
            <div className='shop-content-header'>
                <div className='shop-content-header__title'>{store.name}</div>
                <div className='shop-content-header__button' onClick={() => EventManager.trigger( 'shop', 'close' )} />
            </div>
            <div className='shop-content-container'>
                <div className='shop-content-container-navigation'>
                    {store.shop.map( ( el, key ) => {
                        return <div
                            key={key}
                            className={cn( 'shop-content-container-navigation-box', currentCategory === el.id && 'shop-content-container-navigation-box_active' )}
                            onClick={() => { setCurrentCategory( el.id ); setPage( 'list' ) }}
                        >{el.name}</div>

                    } )}
                    <div
                        className={cn( 'shop-content-container-navigation__button', showButtonBuy && 'shop-content-container-navigation__button_active' )}
                        onClick={() => setShowModal( true )}
                    >Оплатить</div>
                </div>
                {page === 'list' && <List store={store} {...{ currentCategory, addShopBasket, setPage, shopBasket }} />}
                {page === 'basket' && <Basket store={store} {...{ shopBasket, removeShopBasket, currentItemDelete }} />}
            </div>
        </div>
    </div>
}

export default observer( Shop );
