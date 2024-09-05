import { vi, describe, it, expect, beforeEach } from "vitest"
import { mount, shallowMount } from "@vue/test-utils"
import HelloWorld from "./HelloWorld.vue"
import axios from 'axios'
import {createTestingPinia} from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { useAppStore } from "../stores/appStore"

vi.mock('axios')

const app = createApp({})
describe('Hello World Test Suites', () => {
    //Mock fetch function
    global.fetch = vi.fn()

    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // useStore(pinia)
        setActivePinia(createPinia())
    })

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

    //Skipping test because the apicall changed, keeping it here to know how to skip a test
    it.skip('should make a fetch call using a correct url depending on msg prop', async () => {
        //Given the HelloWorld component is mounted
        const instance = shallowMount(HelloWorld)


        // await instance.vm.$nextTick() //You can use this, and remove await from following line
        // When the msg prop change
        await instance.setProps({
            msg: 'test'
        })

        //then we expect the fetch function is called with good url
        expect(fetch).toHaveBeenNthCalledWith(1, 'https://example.com/test')
    })

    it.skip('should call axios.get with https://httpbin.org/get when msg property changes', async () => {
        const instance = shallowMount(HelloWorld)

        await instance.setProps({
            msg: 'test'
        })

        expect(axios.get).toHaveBeenNthCalledWith(1, 'https://httpbin.org/get')
    })

    it.skip('should dispatch changeMessage with "test" if msg prop changes to "test"', async () => {
        const wrapper = shallowMount(HelloWorld, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn()
                    })
                ]
            }
        })

        const store = useAppStore()

        await wrapper.setProps({
            msg: "test"
        })

        expect(store.changeMessage).toHaveBeenNthCalledWith(1, "test")
    })
})