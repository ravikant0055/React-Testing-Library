import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Main component in DOM', () => {
  render(<App/>);
  const childElement = screen.getByText("Login");
  expect(childElement).toBeInTheDocument();
});