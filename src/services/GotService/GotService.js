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
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        //console.log(`api id is ${id}`);
        const char = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name ? char.name : 'no data :(',
            gender: char.gender ? char.gender : 'no data :(',
            born: char.born ? char.born : 'no data :(',
            died: char.died ? char.died : 'no data :(',
            culture: char.culture ? char.culture : 'no data :('
        }
    }

    _transformBook = (book) => {
        return {
            name: book.name ? book.name : 'no data :('
        }
    }

    getAllBooks = async () => {
        const res = await this.getResourse(`/books/`);
        console.log(res);
        return res;
    }

    _transformHouse = (house) => {
        return {
            name: house.name ? house.name : 'no data :(',
            
        }
    }

    getAllHouses = async () => {
        const res = await this.getResourse('/houses/');
        return res;
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this.transformHouse(house);
    }

    //???? что это?
    _extractId (item) {
        const iRegExp = /\/([0-9]*)$/;
        return item.url.match(iRegExp)[1];
    }
}




