export class Perfil{
 
    id : string;
    nome: string
    sobrenome:  string;
    cel: string;;
    cidade: string;
    imagem : string;
   
    constructor(){   
    }

    // Dados do firebase
       setDados(obj : any){
       this.id = obj.id;
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
        this.cel = obj.cel;
        this.cidade = obj.cidade;
    
    }

}