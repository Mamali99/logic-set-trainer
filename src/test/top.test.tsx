import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import IconButton from '../components/top';


test('test IconButton enthält Link zu GitHub', () =>{

    render(<IconButton/>);
    const element = screen.getByTestId('github_icon_button');
    
    expect(element).toHaveAttribute('href', 'https://github.com/siKruger/logic-set-trainer');

})