<template>
    <Dialog v-if="luckyForm" v-model:visible="luckyForm" modal :closable="false" class="modalWidth" :pt="{
        content: 'shadow-lg rounded-b-lg'
    }"
        :style="{ backgroundColor: '#f8fafc', borderWidth: '1px', borderColor: '#bdbbbb71', borderStyle: 'solid', borderRadius: '6px', padding: '20px', backdropFilter: 'blur(12px)' }">
        <template #header>
            <div class="w-full flex justify-between items-center">
                <h2 class="text-lg font-bold">ယနေ့အတွက် Lucky ဂဏန်းများ</h2>
                <Button icon="pi pi-times" @click="showLuckyForm()"
                    class="p-1 flex justify-center items-center p-button-danger" />
            </div>
        </template>
        <div class="container">
            <h2 class="font-bold text-center text-gold text-xl">ခဲခြစ်ပြီး Lucky ဂဏန်းအားရယူပါ</h2>
            <div class="base">
                <h3 class="text-[100px] font-bold" style="font-size: 90px">{{ luckyNumber }}</h3>
            </div>
            <canvas v-if="luckyForm" ref="scratchCanvas" width="200" height="200"></canvas>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const luckyForm = ref(true)
const scratchCanvas = ref(null)
const luckyNumber = ref('')

const checkLocalStorage = () => {
    const storedState = localStorage.getItem('luckyFormState')
    if (storedState) {
        const { visible, timestamp, number } = JSON.parse(storedState)
        const now = new Date().getTime()
        if (now - timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('luckyFormState')
            generateLuckyNumber()
            luckyForm.value = true
        } else {
            luckyNumber.value = number
            luckyForm.value = visible
        }
    } else {
        generateLuckyNumber()
        luckyForm.value = true
    }
}

const saveToLocalStorage = (visible) => {
    const state = {
        visible,
        number: luckyNumber.value,
        timestamp: new Date().getTime()
    }
    localStorage.setItem('luckyFormState', JSON.stringify(state))
}

const generateLuckyNumber = () => {
    const random = Math.floor(100 + Math.random() * 900)
    luckyNumber.value = random.toString()
}

const showLuckyForm = () => {
    luckyForm.value = false
    saveToLocalStorage(false)
}

let context = null
let isDragged = false
let rectLeft = 0
let rectTop = 0

const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

const initCanvas = () => {
    if (!scratchCanvas.value) {
        console.error("Canvas element not found");
        return;
    }

    context = scratchCanvas.value.getContext('2d');
    if (!context) {
        console.error("Failed to get canvas context");
        return;
    }

    const gradientColor = context.createLinearGradient(0, 0, 115, 135);
    gradientColor.addColorStop(0, '#D3D3D3');
    gradientColor.addColorStop(1, '#A9A9A9');
    context.fillStyle = gradientColor;
    context.fillRect(0, 0, 200, 200);

    const rect = scratchCanvas.value.getBoundingClientRect();
    rectLeft = rect.left;
    rectTop = rect.top;
}

const getXY = (e) => {
    const event = e.touches ? e.touches[0] : e
    return {
        x: event.clientX - rectLeft,
        y: event.clientY - rectTop
    }
}

const scratch = (x, y) => {
    if (!context) return;
    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, 12, 0, 2 * Math.PI)
    context.fill()
}

const startScratch = (e) => {
    e.preventDefault()
    isDragged = true
    const { x, y } = getXY(e)
    scratch(x, y)
}

const moveScratch = (e) => {
    if (isDragged) {
        const { x, y } = getXY(e)
        scratch(x, y)
    }
}

const stopScratch = () => {
    isDragged = false
}

onMounted(async () => {
    checkLocalStorage();
    await nextTick();

    if (scratchCanvas.value) {
        initCanvas();

        const canvas = scratchCanvas.value;
        const startEvent = isTouchDevice() ? 'touchstart' : 'mousedown';
        const moveEvent = isTouchDevice() ? 'touchmove' : 'mousemove';
        const endEvent = isTouchDevice() ? 'touchend' : 'mouseup';

        canvas.addEventListener(startEvent, startScratch);
        canvas.addEventListener(moveEvent, moveScratch);
        canvas.addEventListener(endEvent, stopScratch);
        canvas.addEventListener('mouseleave', stopScratch);
    }
});
</script>

<style scoped>
.container {
    width: 100%;
    height: 20em;
    position: relative;
    margin-top: 15px;
    cursor: pointer;
}

.base,
canvas {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    height: 200px;
    width: 200px;
    z-index: 20;
    border-radius: 0.3em;
}

.base {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1.2em 2.5em rgba(16, 2, 96, 0.15);
}

canvas {
    user-select: none;
    touch-action: none;
}
</style>