import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import ErrorMessage from '../ErrorMessage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/GotService';
import RowBlock from '../RowBlock';



export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        error: false,
        selectedChar: null
    }

    onCharSelected = (id) =>{
        console.log(`clicked id: ${id}`)

        this.setState({
            selectedChar: id
        })

        console.log(this.state.selectedChar);
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }


    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                getData={() => this.gotService.getAllCharacters(this.props.charPage)} 
                charPage={this.props.charPage}
                onCharSelected={this.onCharSelected} 
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}/>
        )

        return (
            <RowBlock
                left={itemList}
                right={charDetails}
            /> )  ;
    }
}