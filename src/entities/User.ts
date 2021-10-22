import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
class User { //colunas da tabela

    @PrimaryColumn()
    readonly id: string; //valor somente como letura

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    constructor(){
        if(!this.id){//se o id for diferente de um id que ja existe ele cria um novo id = uuid
            this.id  = uuid();
        }
    }
}
export { User };