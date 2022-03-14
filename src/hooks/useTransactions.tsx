import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'

interface TransactionProps {
  id: number
  title: string
  category: string
  type: string
  amount: number
  createAt: string
}
type TransactionInput = Omit<TransactionProps, 'id' | 'createAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextProps {
  transactions: TransactionProps[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  useEffect(() => {
    api
      .get('/transactions')
      .then(({ data }) => setTransactions(data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', transactionInput)
    const { transaction } = response.data
    setTransactions(transactions => [...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context
}
