import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import RandomCharHideButton from '../RandomCharHideButton';
import ErrorMessage from '../ErrorMessage';
import CharacterPage from '../Pages/CharacterPage';
import GotService from '../../services/GotService';
import BooksPage from '../../components/Pages/BooksPage'


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
            <div> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    
                    <Row>
                        { (this.state.randomcharHiden) ? 
                        null :
                        (
                            <Col lg={{size: 5, offset: 0}}>
                                <RandomChar/>
                            </Col>
                        )}
                    </Row>
                    <RandomCharHideButton onClick={this.hideShowRandomCharacter} >
                        Hide random character
                    </RandomCharHideButton>
                    <Row>
                       <CharacterPage
                       charPage={12}
                       />

                        <BooksPage/>
                   

                    </Row>

                    

                </Container>
            </div>
        )
    }
};

export default App;