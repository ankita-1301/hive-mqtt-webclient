import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Messages from '@/components/common/Messages.vue'

describe('Messages', () => {
  it('displays the given messages', () => {
    const messages = [
      { message: 'Hello', topic: 'welcome/home', qos: 0 },
      { message: 'World', topic: 'world/is/my/home', qos: 1 },
    ]
    const wrapper = mount(Messages, {
      props: {
        messages,
      },
    })
    const messageColumns = wrapper.findAll('.message')
    expect(messageColumns).toHaveLength(messages.length * 3) // 3 columns per message

    messages.forEach((message, index) => {
      const columns = messageColumns.slice(index * 3, index * 3 + 3)
      expect(columns[0].text()).toBe(message.message)
      expect(columns[1].text()).toBe(message.topic)
      expect(columns[2].text()).toBe(message.qos.toString())
    })
  })
})
