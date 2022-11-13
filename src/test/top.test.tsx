import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import IconButton from '../components/top';


test('test IconButton enthält Link zu GitHub', () =>{

    render(<IconButton/>);
    const Iconbutton = screen.getByRole('button');
    
    expect(Iconbutton).toHaveAttribute('href', 'https://github.com/siKruger/logic-set-trainer');

})