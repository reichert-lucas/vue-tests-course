import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor mínimo', () => { // um cenário
    test('não aceita lance com valor negativo', () => { // testes de um cenário
        const wrapper = mount(Lance)
        
        const input = wrapper.find('input') // pegamos o imput do componente usando um selector CSS
        input.setValue(-100)
    
        wrapper.trigger('submit') // ativamos a submissão do formulário
        const lancesEmitidos = wrapper.emitted('novo-lance') // vai verificar se o evento foi emitido
    
        expect(lancesEmitidos).toBeUndefined() // como o valor é inválido esperamos que o valor seja undefined
    })
    
    test('emite um lance quando o valor é maior do que zero', () => {
        const wrapper = mount(Lance)
    
        const input = wrapper.find('input')
        input.setValue(100)
    
        wrapper.trigger('submit') 
        const lancesEmitidos = wrapper.emitted('novo-lance') 
    
        expect(lancesEmitidos).toHaveLength(1) 
    })
    
    test('emite o valor esperado de um lance válido', () => {
        const wrapper = mount(Lance)
    
        const input = wrapper.find('input')
        input.setValue(111)
    
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
    
        const lance = parseInt(lancesEmitidos[0][0])
        expect(lance).toBe(111)
    
    })
})

describe('um lance com valor mínimo', () => {
    test('todos os lances devem ter um valor maior do que o mínimo esperado', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        expect(lancesEmitidos).toHaveLength(1)
    })
    test('emite o valor esperado de um lance valido', () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(400)
        wrapper.trigger('submit')
        const lancesEmitidos = wrapper.emitted('novo-lance')
        const valorLance = parseInt(lancesEmitidos[0][0])
    })
    test('não são aceitos lances com valores inferiores ao valor mínimo', async () => {
        const wrapper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wrapper.find('input')
        input.setValue(100)
        wrapper.trigger('submit')
        await wrapper.vm.$nextTick() // evento que temos que aguardar para que o DOM seja atualizado
        const msgErro = wrapper.find('p.alert').element.textContent
        const msgEsperada = 'O valor mínimo para o lance é de R$ 300'
        expect(msgErro).toBeTruthy()
        expect(msgErro).toContain(msgEsperada)

    })
})