<template lang="pug">
form.form(
  ref="formRef"
  @submit.prevent="onPublish"
)
  h2.form-title Messages
  .columns
    .column.col-6
      input#topic(
        v-model="data.topic"
        name="topic"
        placeholder="Topic"
        required
        :disabled="!isClientConnected"
      )
    .column.col-6
      select#qualityOfService(
        v-model="data.qualityOfService"
        name="qualityOfService"
        placeholder="Quality of service (QoS)"
        required
        :disabled="!isClientConnected"
      )
        option(
          :value="0"
          selected
        ) At most once
        option(:value="1") At least once
        option(:value="2") Exactly once

    .column.col-12
      textarea#message(
        v-model="data.message"
        name="message"
        cols="50"
        placeholder="Message body"
        rows="4"
        required
        :disabled="!isClientConnected"
      )
    .column.col-12
      button(
        type="submit"
        :disabled="disablePublishButton"
      ) Publish Message
    .column.col-12
      messages(:messages="messages")
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Messages from '@/components/common/Messages.vue'

const props = defineProps({
  isClientConnected: false,
  messages: [],
})

const emit = defineEmits(['publish-message'])

const data = reactive({
  topic: '',
  qualityOfService: 0,
  message: '',
  formRef: null,
})

const formRef = ref(null)

const isValidForm = computed(() => {
  return formRef.value.checkValidity()
})

const disablePublishButton = computed(() => !(props.isClientConnected && isValidForm))

function onPublish() {
  emit('publish-message', data.topic, data.message, data.qualityOfService)
  data.message = ''
  data.qualityOfService = 0
  data.topic = ''
}
</script>
