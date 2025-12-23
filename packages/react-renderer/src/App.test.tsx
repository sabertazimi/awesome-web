import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'

describe('Renderer', () => {
  it('should render counter', () => {
    render(<App />)
    const incElement = screen.getByText(/\+/)
    const decElement = screen.getByText(/-/)
    const countElement = screen.getByText(0)

    expect(incElement).toBeInTheDocument()
    expect(decElement).toBeInTheDocument()
    expect(countElement).toBeInTheDocument()
    expect(countElement.textContent).toBe('0')
  })

  it('should increment counter', () => {
    render(<App />)
    const incElement = screen.getByText(/\+/)
    const countElement = screen.getByText(0)

    fireEvent.click(incElement)
    expect(countElement.textContent).toBe('1')
    fireEvent.click(incElement)
    expect(countElement.textContent).toBe('2')
    fireEvent.click(incElement)
    expect(countElement.textContent).toBe('3')
  })

  it('should decrement counter', () => {
    render(<App />)
    const decElement = screen.getByText(/-/)
    const countElement = screen.getByText(0)

    fireEvent.click(decElement)
    expect(countElement.textContent).toBe('-1')
    fireEvent.click(decElement)
    expect(countElement.textContent).toBe('-2')
    fireEvent.click(decElement)
    expect(countElement.textContent).toBe('-3')
  })

  it('should pass snapshot testing', () => {
    const { container } = render(<App />)

    expect(container).toMatchSnapshot()
  })
})
