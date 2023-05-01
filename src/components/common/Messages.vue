<template lang="pug">
.messages
  .columns.header
    .column.col-4.text-bold Message
    .column.col-4.text-bold.align-center Topic
    .column.col-4.text-bold.align-center QoS
    .column.col-12
      hr
  .columns(v-for="(messageItem, index) in messages" :key="index")
    .column.col-4.message {{ messageItem.message }}
    .column.col-4.message.align-center {{ messageItem.topic }}
    .column.col-4.message.align-center {{ messageItem.qos }}
</template>

<script setup>
defineProps({
  messages: [],
})
</script>

<style>
.messages {
  margin-top: 2rem;
}

.text-bold {
  font-weight: bold;
}

.align-center {
  text-align: center;
}
</style>
