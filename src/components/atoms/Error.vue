<template>
    <p class="text-danger text-sm mt-2" v-if="message">{{ message }}</p>
    <p class="text-danger text-sm mt-2" v-if="errors">
        {{ errors[name] ? errors[name][0] : null }}
    </p>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
        },
        errors: {
            type: Object,
        },
        name: {
            name: String,
        },
    },
};
</script>
