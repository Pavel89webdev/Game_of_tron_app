import React, { Component } from 'react';
import ErrorMessage from '../../ErrorMessage';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../ItemDetails';
import GotService from '../../../services/GotService';
import RowBlock from '../../RowBlock';

// меняем CharDetails на ItemDetails  и переносим запросы к Api в пропсы \того компонента

export default class BooksPage extends Component {

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
                getData={() => this.gotService.getAllHouses()} 
                onItemSelected={this.onItemSelected} 
                renderItem={({name}) => name}
            />
        )

        const houseDetails = (
            <ItemDetails 
            id={this.state.selectedItem}
            getData={this.gotService.getHouse}
            >
                <Field 
                    field='region'
                    label='Region' 
                />
                <Field 
                    field='coatOfArms'
                    label='coat of arms' 
                />
                 <Field 
                    field='words'
                    label='Words' 
                />

                
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={houseDetails}
            /> )  ;
    }
}