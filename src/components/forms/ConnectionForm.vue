<template lang="pug">
form.form(@submit.prevent="onConnect" ref="formRef")
  h2.form-title Connection
  .columns
    .column.col-12
      input#hostname(
        v-model="data.hostName"
        name="hostname"
        placeholder="Hostname"
      )
    .column.col-6
      input#username(
        v-model="data.userName"
        name="username"
        placeholder="Username"
      )
    .column.col-6
      input#password(
        v-model="data.password"
        name="password"
        placeholder="Password"
        type="password"
      )
    .column.col-12
      button(type="submit" :disabled="disableConnectButton") Connect
      .success-text(v-if="isClientConnected") MQTT webclient is connected!
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['create-connection'])

const data = reactive({
  hostName: ref(''),
  userName: ref(''),
  password: ref(''),
})

const formRef = ref(null)

const props = defineProps({
  isClientConnected: false,
})

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
