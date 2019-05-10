export class Tarefa {

    public usuarioID:string;

    constructor(public id?:string, public descricao?:string, public data?:string, public imagem: string = '/assets/imgs/camera_off.png') { }
}
