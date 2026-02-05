import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '@/components/shared/Pagination.vue'

describe('Pagination', () => {
  const defaultProps = {
    pages: {
      total_pages: 5,
      current_page: 1,
      has_pre: false,
      has_next: true,
      category: ''
    }
  }

  it('渲染正確的頁碼數量', () => {
    const wrapper = mount(Pagination, { props: defaultProps })
    const pageLinks = wrapper.findAll('li')
    // 5 頁 + 上一頁 + 下一頁 = 7
    expect(pageLinks).toHaveLength(7)
  })

  it('當前頁面有 active 樣式', () => {
    const wrapper = mount(Pagination, { props: defaultProps })
    const firstPageLink = wrapper.findAll('li')[1]!.find('a')
    expect(firstPageLink.classes()).toContain('bg-primary')
  })

  it('第一頁的上一頁按鈕禁用', () => {
    const wrapper = mount(Pagination, { props: defaultProps })
    const prevBtn = wrapper.findAll('li')[0]!.find('a')
    expect(prevBtn.classes()).toContain('pointer-events-none')
  })

  it('最後一頁的下一頁按鈕禁用', () => {
    const wrapper = mount(Pagination, {
      props: {
        pages: { ...defaultProps.pages, current_page: 5, has_pre: true, has_next: false }
      }
    })
    const allLis = wrapper.findAll('li')
    const nextBtn = allLis[allLis.length - 1]!.find('a')
    expect(nextBtn.classes()).toContain('pointer-events-none')
  })

  it('點擊頁碼觸發 update 事件', async () => {
    const wrapper = mount(Pagination, { props: defaultProps })
    const thirdPage = wrapper.findAll('li')[3]!.find('a')
    await thirdPage.trigger('click')
    expect(wrapper.emitted('update')).toBeTruthy()
    expect(wrapper.emitted('update')![0]).toEqual([3])
  })

  it('點擊上一頁觸發 update 事件', async () => {
    const wrapper = mount(Pagination, {
      props: {
        pages: { ...defaultProps.pages, current_page: 3 }
      }
    })
    const prevBtn = wrapper.findAll('li')[0]!.find('a')
    await prevBtn.trigger('click')
    expect(wrapper.emitted('update')![0]).toEqual([2])
  })

  it('點擊下一頁觸發 update 事件', async () => {
    const wrapper = mount(Pagination, { props: defaultProps })
    const allLis = wrapper.findAll('li')
    const nextBtn = allLis[allLis.length - 1]!.find('a')
    await nextBtn.trigger('click')
    expect(wrapper.emitted('update')![0]).toEqual([2])
  })
})
