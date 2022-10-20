import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import style from './basket.module.scss'
import { IShopBasket } from '../../Shop';

const Basket: React.FC<{
    shopBasket: IShopBasket[], removeShopBasket: any,
    currentItemDelete: IShopBasket | null
}> = ( { shopBasket, removeShopBasket, currentItemDelete } ) => {

    return <div className={style.main}>
        <div className={style.__title}>Ваша корзина</div>
        <div className={style.__desc}>Максимальная вместимость корзины <span>20</span> предметов!</div>
        <div className={style.list}>
            <div className={style.titles}>
                <div className={style.__number}>Номер</div>
                <div className={style.__name}>Имя товара</div>
                <div className={style.__amount}>Стоимость</div>
            </div>
            <div className={style.container}>
                {shopBasket.map( ( el, key ) => {
                    return <div key={el.uuid}
                        className={cn( style.box,
                            currentItemDelete?.uuid === el.uuid && style.box_delete
                        )}
                        style={{ top: `${ key * 4.537037037037036 }vh` }}
                    >
                        <div className={style.__number}>{key + 1}</div>
                        <div className={style.__name}>{el.name}</div>
                        <div className={style.__amount}>{el.price} $</div>
                        <div className={style.__button} onClick={() => removeShopBasket( el )}></div>
                    </div>
                } )}
            </div>
        </div>
    </div>
}

export default observer( Basket );
