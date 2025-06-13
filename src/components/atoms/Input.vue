<template>
    <input
        v-bind="$attrs"
        :type="type"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <Error :message="errorMessage" />
</template>

<script>
import Error from "./Error.vue";
export default {
    components: { Error },
    props: {
        type: {
            type: String,
            default: "text",
        },
        maxlength: Number,
        placeholder: String,
        modelValue: {
            type: [String, Number], // Specify the type of the model value
            default: "",
        },
        errorMessage: {
            type: String,
            nullable: true,
        },
    },
};
</script>
