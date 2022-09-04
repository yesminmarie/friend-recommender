import { v4 as uuidV4 } from "uuid";

class Person {
    id?: string;
    cpf: string;
    name: string;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export { Person };