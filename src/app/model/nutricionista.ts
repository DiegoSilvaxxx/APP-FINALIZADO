export class Nutricionista{

    id : string;
    nome : string;
    endereco : string;
    telefone : string;
    email : string;
    imagem : string;

    constructor(){   
    }

    // Dados do firebase
    setDados(obj : any){
        this.nome = obj.nome;
        this.endereco = obj.endereco;
        this.telefone = obj.telefone;
        this.email = obj.email;
    }
}