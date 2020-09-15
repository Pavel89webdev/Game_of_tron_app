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
                getData={() => this.gotService.getAllBooks()} 
                onItemSelected={this.onItemSelected} 
                renderItem={({name}) => name}
            />
        )

        const bookDetails = (
            <ItemDetails 
            id={this.state.selectedItem}
            getData={this.gotService.getBook}
            >
                <Field 
                    field='isbn'
                    label='Isbn' 
                />
                <Field 
                    field='authors'
                    label='Authors' 
                /> 
                <Field 
                    field='numberOfPages'
                    label='NumberOfPages' 
                />
                <Field 
                    field='country'
                    label='Country' 
                />     
            </ItemDetails>
        )

        return (
            <RowBlock
                left={itemList}
                right={bookDetails}
            /> )  ;
    }
}