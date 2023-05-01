<template lang="pug">
form.form(
  ref="formRef"
  @submit.prevent="onConnect"
)
  h2.form-title Connection
  .columns
    .column.col-12
      input#hostname(
        v-model="data.hostName"
        name="hostname"
        placeholder="Hostname"
        required
      )
    .column.col-6
      input#username(
        v-model="data.userName"
        name="username"
        placeholder="Username"
        required
      )
    .column.col-6
      input#password(
        v-model="data.password"
        name="password"
        type="password"
        placeholder="Password"
        required
      )
    .column.col-12
      button(
        type="submit"
        :disabled="disableConnectButton"
      ) Connect
      .success-text(v-if="isClientConnected") MQTT webclient is connected!
  </template>

<script setup>
import { ref, reactive, computed } from 'vue'

const props = defineProps({
  isClientConnected: false,
})

const emit = defineEmits(['create-connection'])

const data = reactive({
  hostName: '',
  userName: '',
  password: '',
})

const formRef = ref(null)

const isValidForm = computed(() => {
  return formRef.value.checkValidity()
})

const disableConnectButton = computed(() => !isValidForm)

function onConnect() {
  emit('create-connection', data.hostName, data.userName, data.password)
}
</script>

<style>
.form-title {
  margin: 1rem 0.5rem;
  font-weight: bold;
}

.success-text {
  color: green;
  margin: 0.5rem 0;
  font-weight: bold;
}
</style>
