<template lang="pug">
.connection-form
  h2.form-title Connection
  input#hostname(
    v-model="hostName"
    name="hostname"
    placeholder="Hostname"
  )
  input#username(
    v-model="userName"
    name="username"
    placeholder="Username"
  )
  input#password(
    v-model="password"
    name="password"
    placeholder="Password"
    type="password"
  )
  button(@click="onConnect") Connect
  .success(v-if="isClientConnected") MQTT webclient is connected!
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['create-connection'])

const hostName = ref('')
const userName = ref('')
const password = ref('')

defineProps({
  isClientConnected: false,
})

function onConnect() {
  emit('create-connection', hostName.value, userName.value, password.value)
}
</script>

<style>
.success {
  color: green;
  margin: 0.5rem 0;
  font-weight: bold;
}
</style>
