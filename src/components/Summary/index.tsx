import { useTransactions } from '../../hooks/useTransactions'
import { ReactComponent as IncomeSVG } from './../../assets/income.svg'
import { ReactComponent as OutcomeSVG } from './../../assets/outcome.svg'
import { ReactComponent as TotalSVG } from './../../assets/total.svg'
import { Container } from './styles'

export const Summary = () => {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount
        acc.total += transaction.amount
      }
      if (transaction.type === 'withdraw') {
        acc.withdraws += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <IncomeSVG />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <OutcomeSVG />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <TotalSVG />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}
