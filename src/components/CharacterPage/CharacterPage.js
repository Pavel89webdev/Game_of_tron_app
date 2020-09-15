import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import ErrorMessage from '../ErrorMessage';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import GotService from '../../services/GotService';
import RowBlock from '../RowBlock';

// меняем CharDetails на ItemDetails  и переносим запросы к Api в пропсы \того компонента

export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        error: false,
        selectedItem: null
    }

    onItemSelected = (id) =>{
        console.log(`clicked id: ${id}`)

        this.setState({
            selectedItem: `${id.slice(-2)}`
        })

        console.log(`${this.state.selectedItem}`);
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
                onItemSelected={this.onItemSelected} 
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedItem}>
                <Field 
                    field='gender'
                    label='Gender' 
                />
                <Field 
                    field='born'
                    label='Born' 
                /> 
                <Field 
                    field='died'
                    label='Died' 
                />
                <Field 
                    field='culture'
                    label='Culture' 
                />     
            </CharDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={charDetails}
            /> )  ;
    }
}