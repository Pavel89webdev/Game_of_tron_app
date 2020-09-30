import React from 'react';
import ItemList from './';
import {mount} from 'enzyme';
import gotService from '../../services/GotService';

describe('testing itemList', () => {
    const service = new gotService();
    const list = mount(<ItemList
                        getData={service.getAllHouses}
                        renderItem={({name}) => name}
                        onItemSelected={(f)=>f}
                        />);
    it('Click on item list must rerender all list in 1 instence', () => {
        list.setState({itemList: [{name: 'Ivan', id: 1}, {name: 'Ivan', id: 2}]});
        list.find('li').first().simulate('click');
        expect(list.find('ul')).toHaveLength(1);
    })
})