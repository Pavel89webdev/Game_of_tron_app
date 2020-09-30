import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const ItemDetailsMain = styled.div`
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
const Field = ({item, field, label}) => {
    return (
        <Li>
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </Li>
    )
}

export {Field}

function ItemDetails({id, getData, children}) {

    const[item, setItem] = useState(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

    function updateData(){

        console.log('update is running');
        console.log(typeof(id))

        setLoading(true);

        if( !id ){
            return;
        }

        getData( id )
            .then( (item) => {
                setItem(item) //? деструктурировать тут или нет?
            })
            .then( () => {
                setLoading(false)
            })
            .catch( () => {
                setError(true)
            })
        }

    useEffect( () => {
        updateData();
        console.log(item);
    }, [id])

    if(error){
        return <ErrorMessage/>
    }

    if(!item) {
        return <ItemDetailsMain>no data to render</ItemDetailsMain>;
    }

    if(loading) {
        return <Spinner/>
    }

    const name = item.name;

    return (
        <ItemDetailsMain>
            <H4>{name}</H4>
            <Ul>
                {
                    React.Children.map( children, (child) => {
                        return React.cloneElement(child, {item})  
                    })
                }
            </Ul>
            
        </ItemDetailsMain>
    );
}

export default ItemDetails;