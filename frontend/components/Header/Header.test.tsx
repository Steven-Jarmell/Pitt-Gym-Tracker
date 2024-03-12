import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './Header'
 
describe('Header', () => {
  it('renders the website logo', () => {
    render(<Header />)
 
    const websiteLogo = screen.getByTestId("website-logo")
 
    expect(websiteLogo).toBeInTheDocument()
  })

  it('renders the navigation tabs', () => {
    render(<Header />)
 
    const navTabs = screen.getByTestId("navigation-tabs")
 
    expect(navTabs).toBeInTheDocument()
  })

  it('renders the toggle theme button', () => {
    render(<Header />)
 
    const toggleThemeButton = screen.getByTestId("toggle-theme-button")
 
    expect(toggleThemeButton).toBeInTheDocument()
  })
})