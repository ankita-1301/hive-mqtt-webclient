<template lang="pug">
form.form(@submit.prevent="onSubscribe" ref="formRef")
  h2.form-title Subscriptions
  .columns
    .column.col-12
      input(
        v-model="data.topicName"
        name="topic"
        placeholder="Topic name"
        :disabled="!isClientConnected"
        required
      )
    .column.col-6
      button(
        :disabled="disableSubscribeButton"
        type="submit"
      ) Subscribe
    .column.col-12
      .topics(v-for="topic in topics")
        .topic &check; {{ topic }}
        hr
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['create-subscription'])

const formRef = ref(null)

const data = reactive({
  topicName: '',
  formRef: null,
})

const props = defineProps({
  isClientConnected: false,
  topics: [],
})

const isValidForm = computed(() => {
  return formRef.value.checkValidity()
})

const disableSubscribeButton = computed(() => !(props.isClientConnected && isValidForm))

function onSubscribe() {
  emit('create-subscription', data.topicName)
  data.topicName = ''
}
</script>

<style>
.topics {
  margin: 0.5rem 0;
}

.topic {
  margin: 0.3rem 0;
}
</style>
