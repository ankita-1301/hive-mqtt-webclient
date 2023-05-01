<template lang="pug">
form.form(@submit.prevent="onPublish" ref="formRef")
  h2.form-title Messages
  .columns
    .column.col-6
      input#topic(
        v-model="data.topic"
        name="topic"
        placeholder="Topic"
        :disabled="!isClientConnected"
        required
      )
    .column.col-6
      select#qualityOfService(
        v-model="data.qualityOfService",
        name="qualityOfService",
        placeholder="Quality of service (QoS)",
        :disabled="!isClientConnected"
        required
      )
        option(:value="0", selected=true) At most once
        option(:value="1") At least once
        option(:value="2") Exactly once

    .column.col-12
      textarea#message(
        v-model="data.message"
        name="message"
        cols="50"
        placeholder="Message body"
        rows="4"
        :disabled="!isClientConnected"
        required
      )
    .column.col-12
      button(
        :disabled="disablePublishButton"
        type="submit"
      ) Publish Message
    .column.col-12
      messages(:messages="messages")
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Messages from '@/components/common/Messages.vue'

const emit = defineEmits(['publish-message'])

const data = reactive({
  topic: '',
  qualityOfService: 0,
  message: '',
  formRef: null,
})

const formRef = ref(null)

const props = defineProps({
  isClientConnected: false,
  messages: [],
})

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
