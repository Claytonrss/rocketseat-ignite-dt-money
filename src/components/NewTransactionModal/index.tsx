import { FormEvent, useState } from 'react'
import Modal from 'react-modal'
import { useTransactions } from '../../hooks/useTransactions'
import { ReactComponent as CloseSVG } from './../../assets/close.svg'
import { ReactComponent as IncomeSVG } from './../../assets/income.svg'
import { ReactComponent as OutcomeSVG } from './../../assets/outcome.svg'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  Modal.setAppElement('#root')

  const [type, setType] = useState('deposit')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)

  const { createTransaction } = useTransactions()

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()
    await createTransaction({
      title,
      amount,
      category,
      type,
    })

    resetModal()
    onRequestClose()
  }

  function resetModal() {
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        aria-label="Fechar Modal"
        onClick={onRequestClose}
      >
        <CloseSVG />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          placeholder="Título"
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          onChange={({ target }) => setAmount(Number(target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <IncomeSVG />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <OutcomeSVG />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          onChange={({ target }) => setCategory(target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
