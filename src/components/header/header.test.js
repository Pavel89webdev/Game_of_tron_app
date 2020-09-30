import React from 'react';
import Header from './';
import {shallow} from 'enzyme';

describe('Testing Header view', ()=> {
    it('Header render correctly', () => {
        const header = shallow(<Header/>);
        expect(header).toMatchSnapshot();
    })
});