import React from 'react';
import { observer } from 'mobx-react-lite';
import { random } from '../../../../utils/random';
import cn from 'classnames';

import style from './list.module.scss'

import ShopStore from '../../../../store/ShopStore';
import { IShopBasket } from '../../Shop';

const List: React.FC<{
    store: ShopStore, currentCategory: number, addShopBasket: any,
    setPage: any, shopBasket: IShopBasket[]
}> = ( { store, currentCategory, addShopBasket, setPage, shopBasket } ) => {

    const getCategory = React.useMemo( () => {
        return store.shop.filter( ( e ) => e.id === currentCategory )[ 0 ];
    }, [ store.shop, currentCategory ] )


    return <div className={style.main}>
        <div className={style.header}>
            <div className={cn( style.basket, shopBasket.length > 0 && style.basket_active )}>
                <div className={style.button} onClick={() => setPage( 'basket' )}>
                    <div>{shopBasket.length}</div>
                </div>
                <span>Нажмите, чтобы открыть корзину</span>
            </div>
            <div className={style.text}>
                Выбрана категория: <span>{store.shop.length > 0 && store.shop[ currentCategory ].name}</span>
            </div>
        </div>
        <div className={style.items}>
            {store.shop.length > 0 && getCategory.list.slice()
                .sort( ( a, b ) => a.price - b.price )
                .map( ( el, key ) => {
                    return <div key={key} className={style.box}>
                        <img src={el.img} alt='' />
                        <div className={style.__name}>{el.name}</div>
                        <div className={style.__price}>
                            Цена: <span>{el.price} $</span>
                        </div>
                        <div className={style.__button} onClick={() => addShopBasket( { uuid: random.uuidv4(), hash: el.hash, name: el.name, price: el.price } )}>В корзину</div>
                    </div>
                } )}
        </div>
    </div>
}

export default observer( List );
