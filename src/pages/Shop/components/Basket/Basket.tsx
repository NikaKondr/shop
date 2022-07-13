import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import './Basket.scss'

const Basket: React.FC<{ store: any, shopBasket: any, removeShopBasket: any, currentItemDelete: any }> = ( { store, shopBasket, removeShopBasket, currentItemDelete } ) => {

    return <div className='shop-content-container-basket'>
        <div className='shop-content-container-basket__title'>Ваша корзина</div>
        <div className='shop-content-container-basket__desc'>Максимальная вместимость корзины <span>20</span> предметов!</div>
        <div className='shop-content-container-basket-list'>
            <div className='shop-content-container-basket-list-titles'>
                <div className='shop-content-container-basket-list-titles__number'>Номер</div>
                <div className='shop-content-container-basket-list-titles__name'>Имя товара</div>
                <div className='shop-content-container-basket-list-titles__amount'>Стоимость</div>
            </div>
            <div className='shop-content-container-basket-list-container'>
                {shopBasket.map( ( el: any, key: any ) => {
                    return <div key={el.uuid}
                        className={cn( 'shop-content-container-basket-list-container-box',
                            currentItemDelete?.uuid === el.uuid && 'shop-content-container-basket-list-container-box_delete'
                        )}
                        style={{ top: `${ key * 4.537037037037036 }vh` }}
                    >
                        <div className='shop-content-container-basket-list-container-box__number'>{key + 1}</div>
                        <div className='shop-content-container-basket-list-container-box__name'>{el.name}</div>
                        <div className='shop-content-container-basket-list-container-box__amount'>{el.price} $</div>
                        <div className='shop-content-container-basket-list-container-box__button' onClick={() => removeShopBasket( el )}></div>
                    </div>
                } )}
            </div>
        </div>
    </div>
}

export default observer( Basket );
