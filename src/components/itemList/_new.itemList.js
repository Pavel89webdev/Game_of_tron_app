import React, {useState, useEffect} from 'react';
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


function ItemList({getData, renderItem, onItemSelected}) {

    const[itemList, setItemList] = useState([]);
    const[error, setError] = useState(false);
    
    useEffect( () => {
        getData()
        .then( itemList => {
            setItemList( [ ...itemList ])
            console.log(itemList)
        } )
        .catch( () => setError(true));
    }, [])

    function renderItems(arr) {

        return (
            arr.map( ( item) =>{
                const {id} = item;
                const label = renderItem(item)

                return (
                    <Li 
                    key={id}
                    onClick={() => onItemSelected({id})}
                    >
                    {label}
                    </Li>
                    )
                } 
            )
        )
    }

    if(error){
            return <ErrorMessage/>
    }

    if( !itemList ){
        return <Spinner/>
    }

    const items = renderItems(itemList)

    return (
        <ListGroup>
            {items}
        </ListGroup>
    );
}

export default ItemList;