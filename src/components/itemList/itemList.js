import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const ListGroup = styled.ul`
    cursor: pointer;
    /* list-group */
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 0.25rem;
    background-color: white;
    padding: 15px 25px;

`

const Li = styled.li`
    /* list-group-item */
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    cursor: pointer;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    :last-child{
        border: none
    }
`


export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount(){

        const {getData} = this.props;

        getData()
            .then( itemList => {
                this.setState({
                    itemList
                })
            } )
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    renderItems(arr) {

        return (
            arr.map( ( item) =>{
                const {id} = item; //задать id в сервисе
                const label = this.props.renderItem(item)

                return (
                    <Li 
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                    >
                    {label}
                    </Li>
                    )
                } 
            )
        )
    }

    render() {

        if( this.state.error){
            return <ErrorMessage/>
        }

        const {itemList} = this.state

        if( !itemList ){
            return <Spinner/>
        }

        const items = this.renderItems(itemList)

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}