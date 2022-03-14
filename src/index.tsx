import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { GlobalStyle } from './styles/global'

import { createServer, Model } from 'miragejs'

createServer({
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 6000,
          createAt: new Date('2022-01-12 09:50:33'),
        },
        {
          id: 2,
          title: 'Ecommerce',
          type: 'deposit',
          category: 'Desenvolvimento',
          amount: 15000,
          createAt: new Date('2022-01-29 05:10:17'),
        },
        {
          id: 3,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Despesas Fixas',
          amount: 1500,
          createAt: new Date('2022-01-05 19:28:44'),
        },
      ],
    })
  },
  models: {
    transaction: Model,
  },
  routes() {
    this.namespace = 'api'
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', { ...data, createAt: new Date() })
    })
  },
})

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
