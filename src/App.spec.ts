import { expect, it } from "vitest"
import { mount, shallowMount } from "@vue/test-utils"
import App from "./App.vue"

it('It should render child component using mount', () => {
    const instance = mount(App)

    expect(instance.html()).toContain("the official Vue + Vite starter")    //Inside HelloWorld.vue
})

it('It shouldnt render child component using mountShallow', () => {
    const instance = shallowMount(App)

    expect(instance.html()).not.toContain("the official Vue + Vite starter")
})


/*
 * The recommendation is to use blackbox testing and shallowMount
 *      Use mount when doing integration and e2e tests
 */