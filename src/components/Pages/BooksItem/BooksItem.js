import React, {Component} from 'react';
import GotService from '../../../services/GotService';
import ItemDetails, {Field} from '../../ItemDetails';

export default class BooksItem extends Component {

    gotService = new GotService();

    render(){
        return (
            <ItemDetails 
            id={this.props.bookId}
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
    }
}
