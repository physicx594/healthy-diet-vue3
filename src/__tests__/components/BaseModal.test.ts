import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '@/components/shared/BaseModal.vue'

describe('BaseModal', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  const mountModal = (props = {}) => {
    return mount(BaseModal, {
      props: {
        modelValue: true,
        title: '測試標題',
        ...props
      },
      slots: {
        default: '<p>內容</p>',
        footer: '<button>確認</button>'
      },
      attachTo: document.body
    })
  }

  it('顯示標題', () => {
    mountModal()
    expect(document.body.innerHTML).toContain('測試標題')
  })

  it('渲染 slot 內容', () => {
    mountModal()
    expect(document.body.innerHTML).toContain('<p>內容</p>')
  })

  it('渲染 footer slot', () => {
    mountModal()
    expect(document.body.innerHTML).toContain('<button>確認</button>')
  })

  it('modelValue 為 false 不渲染 modal 內容', () => {
    mountModal({ modelValue: false })
    expect(document.body.innerHTML).not.toContain('測試標題')
  })

  it('點擊 overlay 觸發關閉', async () => {
    const wrapper = mountModal()
    const overlay = document.body.querySelector('.bg-black\\/50') as HTMLElement
    expect(overlay).not.toBeNull()
    overlay.click()
    await wrapper.vm.$nextTick()
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([false])
  })
})
