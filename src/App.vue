<script setup lang="ts">
import { ref } from 'vue';
import { emitter, formSchema, formModel } from './main.ts';

const submit = () => {
  emitter.emit('submit', formModel.value);
}
</script>

<template>
  <vue-form-generator
    :schema="formSchema"
    :model="formModel"
  />
  <button @click="submit">
    Apply
  </button>
</template>
<style scoped>
:deep(fieldset) {
  border: 0;
}
</style>
