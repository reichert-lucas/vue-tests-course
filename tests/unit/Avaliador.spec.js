import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        produto: "Livro da Casa do Código",
        lanceInicial: 50,
        descricao: "Um livro bem bacana sobre Vue"
    },
    {
        produto: "Livro da Casa do Código",
        lanceInicial: 50,
        descricao: "Um livro sobre testes unitários"
    },
]

describe('um avaliador quer se comunicar com a API', () => {
    test('mostra todos os leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises() 
        const totalDeLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalDeLeiloesExibidos).toBe(leiloes.length)
    })
    test('não há leilões retornados pela API', async () => {
        getLeiloes.mockResolvedValueOnce([])
        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises() 
        const totalDeLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalDeLeiloesExibidos).toBe(0)
    })
})