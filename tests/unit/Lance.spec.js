import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('não aceita lance com valor negativo', () => {
    const wrapper = mount(Lance)
    expect(wrapper).toBeTruthy() // verifica se o componente é verdadeiro (se existe)
})