<template>
    <section>
        <section class="p-3">
            <div class="flex items-center mb-2">
                <div class="bg-gold rounded-full mr-2" style="width: 10px; height: 10px"></div>
                <div>{{ $t('below_fifty_percent') }}</div>
            </div>
            <div class="flex items-center mb-2">
                <div class="bg-gold rounded-full mr-2" style="width: 10px; height: 10px"></div>
                <div>{{ $t('between_fifty_ninety_percent') }}</div>
            </div>
            <div class="flex items-center mb-2">
                <div class="bg-danger rounded-full mr-2" style="width: 10px; height: 10px"></div>
                <div>{{ $t('above_ninety_percent') }}</div>
            </div>
            <div class="flex items-center">
                <div class="bg-gray-500 rounded-full mr-2" style="width: 10px; height: 10px"></div>
                <div>{{ $t('full_bet_reached') }}</div>
            </div>
        </section>
    </section>
</template>
