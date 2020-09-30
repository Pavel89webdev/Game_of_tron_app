import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import styled from 'styled-components';

import './app.css';

import Header from '../header';
import RandomChar from '../randomChar';
import RandomCharHideButton from '../RandomCharHideButton';
import ErrorMessage from '../ErrorMessage';
import CharacterPage from '../Pages/CharacterPage';
import GotService from '../../services/GotService';
import BooksPage from '../Pages/BooksPage';
import HousesPage from '../Pages/HousesPage';
import BooksItem from '../Pages/BooksItem';


const MainTitle = styled.h1`
    font-size: 5em;
    margin: 200px auto;
    background-color: #fff;
    color: #000;
    text-align: center;
`

class App extends Component {

    constructor() {
        super();
        
        this.hideShowRandomCharacter = this.hideShowRandomCharacter.bind(this);
    }

    state = {
        randomcharHiden: false,
        selectedChar: null,
        error: false
    }

    gotService = new GotService();

    componentDidCatch(){
        console.log('error');

        this.setState({
            error: true
        })
    }
    

    hideShowRandomCharacter(){
        const status = this.state.randomcharHiden;
        this.setState({
            randomcharHiden: !status
        });

        
    }

    
    render() {

        if( this.state.error ){
            return <ErrorMessage>Error Error Error in app</ErrorMessage>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                            <Switch>
                                <Route exact path="/got-db" component={ ()=> <MainTitle>Welcome to GOT DB</MainTitle>} />
                                <Route path="/got-db/characters">
                                    <Row>
                                        { (this.state.randomcharHiden) ? 
                                        null :
                                        (
                                            <Col lg={{size: 5, offset: 0}}>
                                                <RandomChar/>
                                            </Col>
                                        )}
                                    </Row>
                                    <Row>

                                        <RandomCharHideButton onClick={this.hideShowRandomCharacter} >
                                        Hide random character
                                        </RandomCharHideButton>
                                
                                    </Row>

                                    <CharacterPage charPage={12}/> 

                                </Route>
                                <Route path="/got-db/houses">
                                    <HousesPage/>    
                                </Route>   
                                <Route exact path="/got-db/books">
                                    <BooksPage/>    
                                </Route>
                                <Route path="/got-db/books/:id" 
                                    render={ 
                                        ({match, location, history}) => {

                                            console.log(match)
                                            const id = match.params.id

                                            return (
                                                <BooksItem bookId={id}/>
                                            )
                                        }}
                                />
                                <Route path="/">
                                    <MainTitle>404 - this page not found</MainTitle>
                                    <button>
                                        <Link to="/got-db">Go to Homepage</Link>
                                    </button>
                                </Route>
                            </Switch>
                    </Container>
                </div>
            </Router>
        )
    }
};

export default App;