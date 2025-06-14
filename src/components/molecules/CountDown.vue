<template>
    <h1 class="text-2xl font-bold text-gold text-center">{{ formattedTime }}</h1>
</template>

<script>
export default {
    data() {
        return {
            timeLeft: 180,
            countdown: null
        };
    },
    computed: {
        formattedTime() {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    },
    methods: {
        startCountdown() {
            this.countdown = setInterval(() => {
                this.timeLeft--;

                if (this.timeLeft === 0) {
                    clearInterval(this.countdown);
                    this.$emit('finished');
                }
            }, 1000);
        },
    },
    mounted() {
        this.startCountdown();
    },
    // beforeDestroy() {
    //     clearInterval(this.countdown);
    // }
};
</script>
