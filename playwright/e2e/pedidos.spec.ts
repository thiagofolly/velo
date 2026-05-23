import { test, expect } from '@playwright/test'
import { generateOrderCode } from '../support/helpers'


/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-0OHIUM',
            status: 'APROVADO',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Thiago Folly',
                email: 'thiago@mail.dev'
            },
            payment: 'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert

        // Verificação usando XPath
        // const orderCode = page.locator(`//p[text()="Pedido"]/..//p[text()="${order}"]`)
        // await expect(orderCode).toBeVisible()

        // Verificação usando recursos do playwright
        // const containerPedido = page.getByRole('paragraph')
        //     .filter({ hasText: /^Pedido$/ })
        //     .locator('..') // sobe um nível para encontrar o elemento pai do texto "Pedido"

        // await expect(containerPedido).toContainText(order, { timeout: 10000 })

        // await expect(page.getByText('APROVADO')).toBeVisible();
        // await expect(page.getByTestId('order-result-VLO-0OHIUM')).toMatchAriaSnapshot(`
        //     - img
        //     - paragraph: Pedido
        //     - paragraph: VLO-0OHIUM
        //     - img
        //     - text: APROVADO
        //     `)
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `)

        const statusBadge = page.getByRole('status').filter({ hasText: order.status })
        await expect(statusBadge).toHaveClass(/bg-green-100/)
        await expect(statusBadge).toHaveClass(/text-green-700/)

        const statusIcon = statusBadge.locator('svg')
        await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-4AZ7G8',
            status: 'REPROVADO',
            color: 'Midnight Black',
            wheels: 'aero Wheels',
            customer: {
                name: 'Antonio Banderas',
                email: 'banderas@mail.com'
            },
            payment: 'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
                - img
                - paragraph: Pedido
                - paragraph: ${order.number}
                - status:
                    - img
                    - text: ${order.status}
                - img "Velô Sprint"
                - paragraph: Modelo
                - paragraph: Velô Sprint
                - paragraph: Cor
                - paragraph: ${order.color}
                - paragraph: Interior
                - paragraph: cream
                - paragraph: Rodas
                - paragraph: ${order.wheels}
                - heading "Dados do Cliente" [level=4]
                - paragraph: Nome
                - paragraph: ${order.customer.name}
                - paragraph: Email
                - paragraph: ${order.customer.email}
                - paragraph: Loja de Retirada
                - paragraph
                - paragraph: Data do Pedido
                - paragraph: /\\d+\\/\\d+\\/\\d+/
                - heading "Pagamento" [level=4]
                - paragraph: ${order.payment}
                - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
                `)

                const statusBadge = page.getByRole('status').filter({ hasText: order.status })
                await expect(statusBadge).toHaveClass(/bg-red-100/)
                await expect(statusBadge).toHaveClass(/text-red-700/)
        
                const statusIcon = statusBadge.locator('svg')
                await expect(statusIcon).toHaveClass(/lucide-circle-x/)
    })

    test('deve consultar um pedido em analise', async ({ page }) => {
        // Test data
        const order = {
            number: 'VLO-L3GN4O',
            status: 'EM_ANALISE',
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'João da Silva',
                email: 'joao@dev.com'
            },
            payment: 'À Vista'
        }

        // Act
        await page.getByTestId('search-order-id').fill(order.number)
        await page.getByTestId('search-order-button').click()

        // Assert

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
                - img
                - paragraph: Pedido
                - paragraph: ${order.number}
                - status:
                    - img
                    - text: ${order.status}
                - img "Velô Sprint"
                - paragraph: Modelo
                - paragraph: Velô Sprint
                - paragraph: Cor
                - paragraph: ${order.color}
                - paragraph: Interior
                - paragraph: cream
                - paragraph: Rodas
                - paragraph: ${order.wheels}
                - heading "Dados do Cliente" [level=4]
                - paragraph: Nome
                - paragraph: ${order.customer.name}
                - paragraph: Email
                - paragraph: ${order.customer.email}
                - paragraph: Loja de Retirada
                - paragraph
                - paragraph: Data do Pedido
                - paragraph: /\\d+\\/\\d+\\/\\d+/
                - heading "Pagamento" [level=4]
                - paragraph: ${order.payment}
                - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
                `)

                const statusBadge = page.getByRole('status').filter({ hasText: order.status })
                await expect(statusBadge).toHaveClass(/bg-amber-100/)
                await expect(statusBadge).toHaveClass(/text-amber-700/)
        
                const statusIcon = statusBadge.locator('svg')
                await expect(statusIcon).toHaveClass(/lucide-clock/)
    })

    test('deve exibir mensagem de pedido não encontrado', async ({ page }) => {
        const order = generateOrderCode()

        // Act
        await page.getByTestId('search-order-id').fill(order)
        await page.getByTestId('search-order-button').click()

        // Assert
        // const title = page.getByRole('heading', {name: 'Pedido não encontrado'})
        // await expect(title).toBeVisible()
        // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})
        // await expect(message).toBeVisible()    

        // Usar recurso snapshot
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `)
    })

})
