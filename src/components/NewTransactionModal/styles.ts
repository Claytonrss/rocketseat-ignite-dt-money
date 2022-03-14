import styled from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    background-color: #e7e9ee;
    border: 1px solid #d7d7d7;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type='submit'] {
    width: 100%;
    height: 4rem;
    padding: 0 1.5rem;
    background-color: var(--green);
    color: #ffffff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

interface RadioBoxProps {
  isActive: boolean
  activeColor: 'green' | 'red'
}

const colors = {
  green: '#33CC95',
  red: '#E52E4c',
}

export const RadioBox = styled.button<RadioBoxProps>`
  border: 1px solid #d7d7d7;
  height: 4rem;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: border-color, background-color 0.2s;

  background-color: ${({ isActive, activeColor }) =>
    isActive ? transparentize(0.9, colors[activeColor]) : 'transparent'};

  &:hover {
    border-color: #999;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`
