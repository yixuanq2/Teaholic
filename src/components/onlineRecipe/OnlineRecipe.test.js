import {render, screen} from '@testing-library/react';

test('renders learn react link', () => {
    render(<OnlineRecipe/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
