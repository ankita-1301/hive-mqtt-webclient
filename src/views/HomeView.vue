<template lang="pug">
.home-view
  h1.page-title MQTT WebClient
  connection-form(
    :is-client-connected="data.isClientConnected"
    @create-connection="onConnect"
  )
  </template>

<script setup>
import mqtt from 'mqtt/dist/mqtt'
import { reactive } from 'vue'
import { v4 as uuid } from 'uuid'
import ConnectionForm from '@/components/forms/ConnectionForm.vue'

const data = reactive({
  isClientConnected: false,
  mqttClient: {},
})

function onConnect(hostname, username, password) {
  const clientOptions = {
    clean: true,
    clientId: uuid(),
    hostname,
    keepalive: 60,
    password,
    path: '/mqtt',
    port: 8884,
    protocol: 'wss',
    protocolVersion: 4,
    reconnectPeriod: 0,
    resubscribe: false,
    username,
  }

  data.mqttClient = mqtt.connect(hostname, clientOptions)

  console.log('Connecting mqtt client', data.mqttClient)

  data.mqttClient.on('connect', function () {
    data.isClientConnected = data.mqttClient.connected
    console.log('Connected..!')
  })

  data.mqttClient.on('error', (error) => {
    console.log('Connection error: ', error)
    data.mqttClient.end()
  })

  data.mqttClient.on('reconnect', () => {
    console.log('Reconnecting...')
  })
}
</script>

<style>
h1 {
  margin: 2rem auto;
}
</style>
