import React from 'react';
import { observer } from 'mobx-react-lite';
import { random } from '../../../../utils/random';
import cn from 'classnames';

import './List.scss'

const List: React.FC<{ store: any, currentCategory: number, addShopBasket: any, setPage: any, shopBasket: any }> = ( { store, currentCategory, addShopBasket, setPage, shopBasket } ) => {

    const getCategory = React.useMemo( () => {
        return store.shop.filter( ( e: any ) => e.id === currentCategory )[ 0 ];
    }, [ store.shop, currentCategory ] )


    return <div className='shop-content-container-list'>
        <div className='shop-content-container-list-header'>
            <div className={cn( 'shop-content-container-list-header-basket', shopBasket.length > 0 && 'shop-content-container-list-header-basket_active' )}>
                <div className='shop-content-container-list-header-basket-button' onClick={() => setPage( 'basket' )}>
                    <div>{shopBasket.length}</div>
                </div>
                <span>Нажмите, чтобы открыть корзину</span>
            </div>
            <div className='shop-content-container-list-header-text'>
                Выбрана категория: <span>{store.shop.length > 0 && store.shop[ currentCategory ].name}</span>
            </div>
        </div>
        <div className='shop-content-container-list-items'>
            {store.shop.length > 0 && getCategory.list.slice().sort( ( a: any, b: any ) => a.price - b.price ).map( ( el: any, key: any ) => {
                return <div key={key} className='shop-content-container-list-items-box'>
                    <img src={el.img} alt='' />
                    <div className='shop-content-container-list-items-box__name'>{el.name}</div>
                    <div className='shop-content-container-list-items-box__price'>
                        Цена: <span>{el.price} $</span>
                    </div>
                    <div className='shop-content-container-list-items-box__button' onClick={() => addShopBasket( { uuid: random.uuidv4(), hash: el.hash, name: el.name, price: el.price } )}>В корзину</div>
                </div>
            } )}
        </div>
    </div>
}

export default observer( List );
