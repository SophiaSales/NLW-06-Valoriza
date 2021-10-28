//Sobrescrevendo a bibliotaca do express para usar qualquer parametro no request
declare namespace Express{
    export interface Request{
        user_id: string;
    }
}