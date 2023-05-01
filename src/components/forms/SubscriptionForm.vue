<template lang="pug">
.subscription-form
  h2.form-title Subscriptions
  .columns
    .col-12
      input(
        v-model="data.topicName"
        name="topic"
        placeholder="Topic name"
        :disabled="!isClientConnected"
      )
    .col-6
      button(
        :disabled="disableSubscribeButton"
        @click="onSubscribe"
      ) Subscribe
    .col-12
      .topics(v-for="topic in topics")
        .topic &check; {{ topic }}
        hr
</template>

<script setup>
import { reactive, computed } from 'vue'

const emit = defineEmits(['create-subscription'])

const data = reactive({
  topicName: '',
})

const props = defineProps({
  isClientConnected: false,
  topics: [],
})

const disableSubscribeButton = computed(
  () => !(props.isClientConnected && data.topicName.trim() !== '')
)

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

hr {
  width: calc(100% - 4rem);
}
</style>
