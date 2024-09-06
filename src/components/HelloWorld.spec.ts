import { vi, describe, it, test, expect, beforeEach } from "vitest"
import { mount, shallowMount } from "@vue/test-utils"
import axios from 'axios'
import {createTestingPinia} from '@pinia/testing'
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { useAppStore } from "../stores/appStore"

import HelloWorld, {HelloWorldProps} from "./HelloWorld.vue"
import TitleComponent from './TitleComponent.vue'

vi.mock('axios')

const app = createApp({})

const createWrapper = (props?: HelloWorldProps) => shallowMount(HelloWorld, { props })

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
        expect(instance.find('h1').text()).toBe("My Title: My first test!")
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

    it('should bind the message property with a prefix(My Title:) to TitleComponent', () => {
        const wrapper = mount(HelloWorld, {
            props: {
                msg: 'First Section'
            }
        })

        const titleComponentWrapper = wrapper.findComponent(TitleComponent)

        expect(titleComponentWrapper.props('value')).toBe('My Title: First Section')
    })

    test.each([
        {
            msg: 'First Section',
            titleComponentExists: true
        },
        {
            msg: null,
            titleComponentExists: false
        },
        {
            msg: '',
            titleComponentExists: false
        },
        {
            msg: undefined,
            titleComponentExists: false
        },
    ])
    ('msg: $msg -> titleComponentExists: $titleComponentExists', ({msg, titleComponentExists}) => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg: msg
            }
        })

        const titleComponentWrapper = wrapper.findComponent(TitleComponent)

        expect(titleComponentWrapper.exists()).toBe(titleComponentExists)
    })

    test.each([
        {
            msg: 'First Section',
            successClassExists: false
        },
        {
            msg: null,
            successClassExists: true
        },
        {
            msg: '',
            successClassExists: true
        },
        {
            msg: undefined,
            successClassExists: true
        },
    ])
    ('msg: $msg -> successClassExists: $successClassExists', ({msg, successClassExists}) => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg: msg
            }
        })

        const cardElementWrapper = wrapper.find<HTMLDivElement>('.card-success')    //HtmlDivElement is a type, this tests if for typescript

        expect(cardElementWrapper.exists()).toBe(successClassExists)
    })


    /*
     * If instead of having v-if in HelloWorld > TitleConponent we had v-show, 
     *      the test should check the style and not if the element exists
     */
    test.skip
    .each([
        {
            msg: 'First Section',
            titleComponentStyle: undefined
        },
        {
            msg: null,
            titleComponentStyle: 'display: none;'
        },
        {
            msg: '',
            titleComponentStyle: 'display: none;'
        },
        {
            msg: undefined,
            titleComponentStyle: 'display: none;'
        },
    ])
    ('msg: $msg -> titleComponentStyle: $titleComponentStyle', ({msg, titleComponentStyle}) => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg: msg
            }
        })

        const titleComponentWrapper = wrapper.findComponent(TitleComponent)

        expect(titleComponentWrapper.element.attributes.getNamedItem('style')?.value).toBe(titleComponentStyle)
    })

    it('should emit cardClicked when the card is clicked', async () => {
        const wrapper = createWrapper()
        const card = wrapper.find('.card')

        await card.trigger('click')

        expect(wrapper.emitted('card-clicked')).toBeTruthy()
    })

    it('should emit up event when title component emit on-mounted event', async () => {
        /* 
         * Need to pass msg because in my template TitleComponent has a v-if
         *      If i don't pass a message the component won't be rendered and will give an error
         *      Error: Cannot call vm on an empty VueWrapper
         */
        // const wrapper = createWrapper()
        const wrapper = createWrapper({ msg: 'Message'})

        const titleComponentWrapper = wrapper.findComponent(TitleComponent)
        console.log(titleComponentWrapper)

        titleComponentWrapper.vm.$emit('on-mounted')

        expect(wrapper.emitted('up')).toBeTruthy()
        expect(wrapper.emitted('up')).toHaveLength(1) //Was called 1 time
        expect(wrapper.emitted('up')?.[0][0]).toBe(0) //Initial value of count
    })
})