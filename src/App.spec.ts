import { expect, it, beforeEach } from "vitest"
import { mount, shallowMount } from "@vue/test-utils"
import App from "./App.vue"
import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'

const app = createApp({})

beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // useStore(pinia)
    setActivePinia(createPinia())
})

it('It should render child component using mount', () => {
    const instance = mount(App)

    expect(instance.html()).toContain("the official Vue + Vite starter")    //Inside HelloWorld.vue
})

it('It shouldnt render child component using mountShallow', () => {
    const instance = shallowMount(App)

    expect(instance.html()).not.toContain("the official Vue + Vite starter")
})