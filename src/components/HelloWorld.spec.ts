import { expect, it } from "vitest"
import { mount, shallowMount } from "@vue/test-utils"
import HelloWorld from "./HelloWorld.vue"

it('should render message from props', () => {
    const instance = mount(HelloWorld, { 
        props: {
            msg: 'My first test!'
        }
    })

    // expect(instance.find('h1').html()).toContain('My first test!')
    expect(instance.find('h1').text()).toBe("My first test!")
})

// WHITEBOX approach, you test the methods internally
it('should increment count when increment method is called', () => {
    const instance = mount(HelloWorld)

    expect(instance.vm.count).toBe(0)

    instance.vm.increment()
    expect(instance.vm.count).toBe(1)
})

// BLACKBOX approach, you test the behaviors not the methods
it('should increment count and display it', async () => {
    const instance = mount(HelloWorld)

    const button = instance.find('button')

    expect(button.text()).toBe('count is 0')

    await button.trigger('click')

    expect(button.text()).toBe('count is 1')
})