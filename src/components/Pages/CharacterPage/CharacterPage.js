import React, { Component } from 'react';
import ErrorMessage from '../../ErrorMessage';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../ItemDetails';
import GotService from '../../../services/GotService';
import RowBlock from '../../RowBlock';

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
            selectedItem: `${id.replace(/\D/g, '')}`
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
            <ItemDetails 
            id={this.state.selectedItem}
            getData={this.gotService.getCharacter}
            >
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
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={charDetails}
            /> )  ;
    }
}