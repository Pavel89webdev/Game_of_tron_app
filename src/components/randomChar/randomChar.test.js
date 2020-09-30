import React from 'react';
import RandomChar from './';
import { shallow} from 'enzyme';

describe('Testing RandomChar', () => {
    const char = shallow(<RandomChar/>);

    describe('testing snap and state RandomChar', () => {

        it('Random char render correctly', () => {
            expect(char).toMatchSnapshot();
        });

        it('testing RandomChar state "char" is empty object', () => {
            expect(char.state().char).toBeObject();
        })

        it('testing RandomChar state "loading" is true', () => {
            expect(char.state().loading).toBeTruthy();
        })

        it('testing RandomChar state "error" is false', () => {
            expect(char.state().error).toBeFalsy();
        })
    })

    describe('Hendlers test RandomChar', () => {

        it('testing onCharLoaded', ()=> {
            char.instance().onCharLoaded();
            expect(char.state().loading).toBeFalsy();
        });

        it('testing onError', ()=> {
            char.instance().onError();
            expect(char.state().loading).toBeFalsy();
            expect(char.state().error).toBeTruthy();
        });

        it('testing updateCharacter', ()=> {
            char.instance().updateCharacter();
            expect(char.state().loading).toBeFalsy();
        });
    })
})