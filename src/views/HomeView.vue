<template lang="pug">
.home-view
  h1.page-title MQTT WebClient
  connection-form(
    :is-client-connected="data.isClientConnected"
    @create-connection="onConnect"
  )
  subscription-form(
    :is-client-connected="data.isClientConnected"
    :topics="data.topics"
    @create-subscription="onCreateSubscription"
  )
  </template>

<script setup>
import mqtt from 'mqtt/dist/mqtt'
import { reactive } from 'vue'
import { v4 as uuid } from 'uuid'
import ConnectionForm from '@/components/forms/ConnectionForm.vue'
import SubscriptionForm from '@/components/forms/SubscriptionForm.vue'

const data = reactive({
  isClientConnected: false,
  mqttClient: {},
  topics: [],
})

async function onConnect(hostname, username, password) {
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

  data.mqttClient.on('connect', function () {
    data.isClientConnected = data.mqttClient.connected
    createAlert('Connected!')
  })

  data.mqttClient.on('error', (error) => {
    createAlert('Connection error ', error)
    data.mqttClient.end()
  })

  data.mqttClient.on('reconnect', () => {
    createAlert('Reconnecting')
  })
}

function onCreateSubscription(topic) {
  if (!data.topics.includes(topic.trim())) {
    data.mqttClient.subscribe(topic, function (error) {
      if (!error) {
        createAlert('subscribed!')
        data.topics.push(topic)
      }
    })
  }
}

function createAlert(message) {
  alert(message)
}
</script>
