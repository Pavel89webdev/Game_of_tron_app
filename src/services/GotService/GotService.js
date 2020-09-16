export default class GotService{

    constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api/';

    } 

    getResourse = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if( !res.ok ){
            throw new Error(`Could not fetch ${url}`);
        }

        return await res.json();
    }

    getAllCharacters = async (page) => {
        const res = await this.getResourse(`/characters?page=${page}&pageSize=10`);
        console.log(res.map(this._transformCharacter));
        return res.map(this._transformCharacter);
        
    }

    _transformCharacter = (char) => {
        return {
            name: char.name ? char.name : 'no data :(',
            gender: char.gender ? char.gender : 'no data :(',
            born: char.born ? char.born : 'no data :(',
            died: char.died ? char.died : 'no data :(',
            culture: char.culture ? char.culture : 'no data :(',
            id: char.url 
        }
    }

    getCharacter = async (id) => {
        //console.log(`api id is ${id}`);
        const char = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    _transformBook = (book) => {
        return {
            name: book.name ? book.name : 'no data :(',
            id: book.url,
            authors: book.authors ? book.authors : 'no data: (',
            isbn: book.isbn ? book.isbn : 'no data :(',
            numberOfPages: book.numberOfPages ? book.numberOfPages : 'no data :(',
            country: book.country ? book.country : 'no data :('

        }
    }

    getAllBooks = async () => {
        const res = await this.getResourse(`/books/`);
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        //console.log(`api id is ${id}`);
        const book = await this.getResourse(`/books/${id}`);
        return this._transformBook(book);
    }

    _transformHouse = (house) => {
        return {
            name: house.name ? house.name : 'no data :(',
            id: house.url ? house.url : 'no data :(',
            region: house.region ? house.region : 'no data :(',
            coatOfArms: house.coatOfArms ? house.coatOfArms : 'no data :(',
            words: house.words ? house.words : 'no data :('            
        }
    }

    getAllHouses = async () => {
        const res = await this.getResourse('/houses/');
        return res.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house);
    }

    //???? что это?
    _extractId (item) {
        const iRegExp = /\/([0-9]*)$/;
        return item.url.match(iRegExp)[1];
    }
}




