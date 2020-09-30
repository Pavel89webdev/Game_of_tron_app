import React, { Component } from 'react';
import ErrorMessage from '../../ErrorMessage';
import ItemList from '../../itemList';
import GotService from '../../../services/GotService';
import {withRouter} from 'react-router-dom';
import {Col} from 'reactstrap';


class BooksPage extends Component {

    gotService = new GotService();

    state = {
        error: false,
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

        return (
            <Col md="6">
                <ItemList
                getData={() => this.gotService.getAllBooks()} 
                onItemSelected={
                    ({id})=>{
                        console.log(id)
                        this.props.history.push(`/got-db/books/${id}`)
                    }
                } 
                renderItem={({name}) => name}
            />
            </Col>
            )  ;
    }
}

export default withRouter(BooksPage);