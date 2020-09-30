import React, {useState, useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/GotService';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

function RandomChar() {

    const[name, setName] = useState(null);
    const[gender, setGender] = useState(null);
    const[born, setBorn] = useState(null);
    const[died, setDied] = useState(null);
    const[culture, setCulture] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);

    const gotService = new GotService();

    const onCharLoaded = (char) => {
        setName( char.name);
        setGender( char.gender );
        setBorn( char.born );
        setDied( char.died );
        setCulture( char.culture );
        setLoading( false );
    }

    const onError = () => {
        setError( true );

    }

    const updateCharacter = () => {
        console.log('update');
        const id = Math.floor( Math.random()*125 + 25);
        gotService.getCharacter(id)
            .then( onCharLoaded )
            .catch( onError);
    }

    //updateCharacter();

    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 10000);
        return () => {
            clearInterval(timerId);
        }
    }, [])

    const View = () => {
    
        return (
            <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
        )
    }


    return (
            <div className="random-block rounded">
                {(loading ? 
                    <Spinner/> :
                    (error) ?
                        <ErrorMessage/> :
                        <View/>
                    )}
            </div>
        );
}

export default RandomChar;


