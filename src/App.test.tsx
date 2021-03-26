import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders both tasks', () => {
    render(<App />);

    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
});
