import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const $router = {
    push: jest.fn() // declaramos o router e dizemos que ele vai ter uma função chamada push
}

describe('um novo leilao deve ser criado', () => {
    test('dado um formulário preenchido, um novo leilão deve ser criado', () => {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        })
        wrapper.find('.produto').setValue('Um livro da casa do código')
        wrapper.find('.descricao').setValue('conteúdo de primeira')
        wrapper.find('.valor').setValue(50)
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toBeCalled()
    })
})