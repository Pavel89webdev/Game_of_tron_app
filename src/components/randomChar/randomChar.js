import React, {Component} from 'react';
import './randomChar.css';
import GotService from '../../services/GotService';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

export default class RandomChar extends Component {

    state = {
        char: {}, //not use it,s create inly for lesson for testing
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null,
        loading: true,
        error: false,
    }

    gotService = new GotService();

    onCharLoaded = (char) => this.setState({
        ...char,
        loading: false
    })

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })

    }

    updateCharacter = () => {
        console.log('update');
        const id = Math.floor( Math.random()*125 + 25);
        this.gotService.getCharacter(id)
            .then( this.onCharLoaded )
            .catch( this.onError);
    }

    componentDidMount(){
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 10000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    render() {
        
        console.log('render');

        const {loading, error} = this.state

        return (
            <div className="random-block rounded">
                {(loading ? 
                    <Spinner/> :
                    (error) ?
                        <ErrorMessage/> :
                    <View char={this.state}/>
                    )}
            </div>
        );
    }
}

const View = ({char}) => {
    
    const{name, gender, born, died, culture} = char

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
