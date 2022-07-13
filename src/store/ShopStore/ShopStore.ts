import {
    makeObservable,
    observable,
    action
} from "mobx";

interface IShop {id: number, name: string, list: Array<{hash: string, name: string, price: number, img: string}>}

export default class ShopStore {

    isShow: boolean = true;

    name: string = 'Оружейный магазин №01';

    shop: IShop[] = [
        {
            id: 0, // index
            name: 'Холодное оружие',
            list: [                
                {hash: '5a78787c', name: 'Antique Cavalry Dagger', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Antique%20Cavalry%20Dagger.png?raw=true'},
                {hash: '6a78787c', name: 'Baseball Bat', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Baseball%20Bat.png?raw=true'},
                {hash: '7a78787c',  name: 'Battle Axe', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Battle%20Axe.png?raw=true'},
                {hash: '8a78787c', name: 'Broken Bottle', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Broken%20Bottle.png?raw=true'},
                {hash: '9a78787c', name: 'Crowbar', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Crowbar.png?raw=true'},
                {hash: '0a78787c', name: 'Golf Club', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Melee%20Weapons/Golf%20Club.png?raw=true'},
            ]
        },
         {
            id: 1,
            name: 'Пистолеты',
            list: [
                {hash: '178787c', name: 'AP Pistol', price: 800,  img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Pistols/AP%20Pistol.png'},
                {hash: '278787c', name: 'Combat Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Combat%20Pistol.png?raw=true'},
                {hash: '378787c', name: 'Double-Action Revolve', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Double-Action%20Revolver.png?raw=true'},
                {hash: '478787c', name: 'Flare Gun', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Flare%20Gun.png?raw=true'},
                {hash: '578787c', name: 'Heavy Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Heavy%20Pistol.png?raw=true'},
                {hash: '678787c', name: 'Heavy Revolver MK II', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Heavy%20Revolver%20MK%20II.png?raw=true'},
                {hash: '778787c',  name: 'Heavy Revolver', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Heavy%20Revolver.png?raw=true'},
                {hash: '878787c', name: 'Marksman Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Marksman%20Pistol.png?raw=true'},
                {hash: '978787c', name: 'Pistol .50', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Pistol%20.50.png?raw=true'},
                {hash: '0178787c', name: 'Pistol MK II', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Pistol%20MK%20II.png?raw=true'},
                {hash: '0278787c', name: 'Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Pistol.png?raw=true'},
                {hash: '0378787c', name: 'SNS Pistol MK II', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/SNS%20Pistol%20MK%20II.png?raw=true'},
                {hash: '0478787c', name: 'SNS Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/SNS%20Pistol.png?raw=true'},
                {hash: '0578787c', name: 'Stun gun', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Stun%20gun.png?raw=true'},
                {hash: '0678787c', name: 'Up-n-Atomizer', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Up-n-Atomizer.png?raw=true'},
                {hash: '0778787c', name: 'Vintage Pistol', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Pistols/Vintage%20Pistol.png?raw=true'},
            ]
        },
        {
            id: 2,
            name: 'Автоматы',
            list: [
                {hash: '1178787c', name: 'Advanced Rifle', price: 800, img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Assault%20Rifles/Advanced%20Rifle.png'},
                {hash: '1278787c', name: 'Assault Rifle MK II', price: 1200, img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Assault%20Rifles/Assault%20Rifle%20MK%20II.png'},
                {hash: '1378787c', name: 'Assault Rifle', price: 1200,  img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Assault%20Rifles/Assault%20Rifle.png'},
                {hash: '1478787c', name: 'Bullpup Rifle MK II', price: 1200,  img: 'https://raw.githubusercontent.com/R3DIANCE/GTA-V-Weapons-images/master/Assault%20Rifles/Bullpup%20Rifle%20MK%20II.png'},
                {hash: '1578787c', name: 'Bullpup Rifle', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Assault%20Rifles/Bullpup%20Rifle.png?raw=true'},
                {hash: '1678787c', name: 'Carbine Rifle MK II', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Assault%20Rifles/Carbine%20Rifle%20MK%20II.png?raw=true'},
                {hash: '1778787c', name: 'Carbine Rifle', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Assault%20Rifles/Carbine%20Rifle.png?raw=true'},
                {hash: '1878787c', name: 'Compact Rifle', price: 1200,  img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Assault%20Rifles/Compact%20Rifle.png?raw=true'},

            ]
        },
        {
            id: 3,
            name: 'Дробовики',
            list: [
                {hash: '1s178787c', name: 'Compact Grenade Launcher.', price: 800, img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Heavy%20Weapons/Compact%20Grenade%20Launcher.png?raw=true'},

            ]
        },
        {
            id: 4,
            name: 'Снайперские винтовки',
            list: [
                {hash: '11e78787c', name: 'Heavy Sniper MK II', price: 800, img: 'https://github.com/R3DIANCE/GTA-V-Weapons-images/blob/master/Sniper%20Rifles/Heavy%20Sniper%20MK%20II.png?raw=true'},

            ]
        },
        {
            id: 5,
            name: 'Патроны',
            list: [
                {hash: '117а8787c', name: '.50', price: 800, img: 'https://cdn.discordapp.com/attachments/639420321677443073/996809827852492840/pngwing.com.png'},

            ]
        },
        {
            id: 6,
            name: 'Бронижелеты',
            list: [
                {hash: '1178е787c', name: 'Бронижелет', price: 800, img: 'https://cdn.discordapp.com/attachments/639420321677443073/996810025899139214/pngwing.com_1.png'},

            ]
        },

    ]

    constructor() {
        makeObservable(this, {
            isShow: observable,
            name: observable,
            shop: observable,

            setShow: action.bound,
            setName: action.bound,
            setShop: action.bound,
        });

    }

    setShow(data: boolean) {
        this.isShow = data;
    }

    setName(data: string) {
        this.name = data;
    }

    setShop(data: any) {
        this.shop = data;
    }

}