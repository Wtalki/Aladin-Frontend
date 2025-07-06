<template>
    <div class="fixed z-50 h-24 -bottom-2 appWidth overflow-hidden">
        <div class="grid grid-cols-5 h-full bg-primary">
            <Button class="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group" type="link"
                route="/">
                <HomeIcon class="mb-2 !text-gold" />
                <span class="text-xs !text-light">{{ $t('Home') }}</span>
            </Button>
            <Button class="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group" type="link"
                route="/payment">
                <WalletIcon class="mb-2 !text-gold" />
                <span class="text-xs text-center line-clamp-1 w-20 !text-light">{{ $t('Wallet') }}</span>
            </Button>
            <Button class="flex items-center justify-center">
                <button
                    class="inline-flex items-center justify-center !w-14 !h-14 font-medium !text-light rounded-full hover:bg-yellow-600 group focus:ring-4 focus:ring-yellow-300 focus:outline-none"></button>
            </Button>
            <Button type="link" route="/service"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group">
                <svg xmlns="http://www.w3.org/2000/svg" class="!w-5 !h-5 mb-2 !text-gold"
                    fill="currentColor" viewBox="0 0 512 512">
                    <path
                        d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                <span class="text-xs !text-light">{{ $t('Service') }}</span>
            </Button>
            <Button type="link" route="/profile"
                class="inline-flex flex-col items-center justify-center px-5 hover:bg-secondary group">
                <svg class="!w-5 !h-5 mb-2 !text-gold" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <span class="text-xs !text-light">{{ $t('Profile') }}</span>
            </Button>
        </div>
    </div>
    <nav class="menu">
        <input type="checkbox" name="" class="checkbox" />
        <div class="checkbox-list">
            <router-link to="/twod" class="nav-item" href="#"><img :src="require('@/assets/images/svg/2D.svg')"
                    class="!w-14" /><span class="tab-title">2D</span></router-link>
            <router-link to="/threed" class="nav-item" href="#"><img :src="require('@/assets/images/svg/3D.svg')"
                    class="!w-14" /><span class="tab-title">3D</span></router-link>
            <router-link to="/deposit" class="nav-item" href="#"><img
                    :src="require('@/assets/icons/circle_deposit.png')" class="!w-14" /><span
                    class="tab-title">Deposit</span></router-link>
        </div>
    </nav>
</template>

<script>
import HomeIcon from '@/components/icons/HomeIcon.vue'
import WalletIcon from '@/components/icons/WalletIcon.vue'
import Button from '@/components/atoms/Button.vue'

export default {
    components: { HomeIcon, WalletIcon, Button }
}
</script>
<style scoped>
.menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 0 15px 15px;
    margin: 10px;
}

.nav-item {
    position: relative;
}

.tab-title {
    display: none;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 12px;
    background: #222;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    width: max-content;
    text-transform: capitalize;
}

.tab-title:before {
    content: '';
    position: absolute;
    border-color: #222 transparent transparent transparent;
    border-style: solid;
    border-width: 6px;
    width: 0px;
    height: 0px;
    bottom: -12px;
    left: 50%;
    transform: translate(-50%, 0);
}

.nav-item:hover .tab-title {
    display: block;
}

.checkbox {
    background-color: #fff;
    cursor: pointer;
    width: 0;
    height: 0;
    position: fixed;
    top: 97%;
    left: 50%;
    z-index: 100;
}

.checkbox:before {
    content: '';
    width: 65px;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    top: -30px;
    left: 0;
    position: absolute;
    border-radius: 100%;
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    transition: all 0.2s linear;
    border: 4px solid #fff;
}

.checkbox:after {
    content: '+';
    position: absolute;
    font-size: 4em;
    color: #fff;
    top: -30px;
    left: 0;
    transform: translate(-50%, -50%);
    transition: all 0.1s linear;
}

.checkbox:checked+.checkbox-list {
    top: 80%;
    transform: rotate(0deg);
}

.checkbox:checked+.checkbox-list .nav-item {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    aspect-ratio: 1;
    position: fixed;
    left: 0;
    transform: translate(-50%, -15px);
}

.checkbox:checked+.checkbox-list .nav-item:hover .tab-title {
    display: block !important;
}

.checkbox:checked+.checkbox-list .nav-item>i {
    color: #fff;
    display: block;
    transition: all 0.5s linear;
}

.checkbox:checked+.checkbox-list .nav-item:nth-child(1) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    top: -80%;
    left: -90px;
}

.checkbox:checked+.checkbox-list .nav-item:nth-child(2) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    left: 0;
    top: -40px;
}

.checkbox:checked+.checkbox-list .nav-item:nth-child(3) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    top: 0px;
    left: 90px;
}

.checkbox:checked:before {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    box-shadow: 0 0 10px #c7c7c7;
}

.checkbox:checked:after {
    transform: translate(-50%, -50%) rotate(45deg);
    /* color: red; */
}

.checkbox-list {
    position: fixed;
    top: 92.2%;
    display: block;
    z-index: 1;
    transform: rotate(-90deg) translate(0, -50%);
    transition: all 0.1s linear;
}

.checkbox-list .nav-item {
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    aspect-ratio: 1;
    position: absolute;
    transform: translate(15px, -50%);
    transition: all 0.2s linear;
}

.checkbox-list .nav-item .tab-title {
    display: none;
}

.checkbox-list .nav-item>i {
    color: #fff;
    display: block;
}

.checkbox-list .nav-item:nth-child(1) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    left: -72px;
}

.checkbox-list .nav-item:nth-child(2) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    left: -68px;
}

.checkbox-list .nav-item:nth-child(3) {
    background: linear-gradient(180deg, rgba(255, 188, 1, 1) 0%, rgba(254, 82, 0, 1) 80%, rgba(251, 73, 0, 1) 100%);
    left: -64px;
}
</style>
