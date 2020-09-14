import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/GotService';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const CharDetailsMain = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem;
`

const H4 = styled.h4`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem;
    margin-bottom: 20px;
    text-align: center;
`

const SelectError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`

const Ul = styled.ul`
    /* list-group */
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    /* list-group-flush */
    border-right-width: 0;
    border-left-width: 0;
    border-radius: 0;
`

const Li = styled.li`
    /* list-group-item */
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.125);
    :last-child{
        border: none
    }
`


export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        char: null,
        loading: false,
        error: false
    }

    updateChar(){
        const {charId} = this.props

        this.setState({
            loading: true
        })

        if( !charId){
            return;
        }

        this.gotService.getCharacter(charId)
            .then( (char) => {
                this.setState({char})
            })
            .then( () => {
                this.setState({
                    loading: false
                })
            })

        //console.log(`Detail of ID ${charId}`)
    }

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(prevProps.charId !== this.props.charId){
            this.updateChar();
        }
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error){
            return <ErrorMessage/>
        }

        if(!this.state.char) {
            return <CharDetailsMain>no data to render</CharDetailsMain>;
        }

        if( this.state.loading) {
            return <Spinner/>
        }

        const {name, gender, born, died, culture} = this.state.char

        return (
            <CharDetailsMain>
                <H4>{name}</H4>
                <Ul>
                    <Li>
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </Li>
                    <Li>
                         <span className="term">Born</span>
                        <span>{born}</span>
                    </Li>
                    <Li>
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </Li>
                    <Li>
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </Li>
                </Ul>
            </CharDetailsMain>
        );
    }
}