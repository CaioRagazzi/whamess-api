import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
var date = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});

@Entity()
export class Users {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  messagesCount: number;

  @Column()
  createdOn: Date = new Date();

  @Column()
  expiresOn: Date = new Date((new Date()).setDate((new Date()).getDate() + 7));
}

@Entity()
export class MessagesInfo {
  
  @PrimaryGeneratedColumn()
  mes_id: number;

  @Column()
  usr_id: number;

  @Column({ default: 0 })
  mes_messagesperday: number;

  @Column({default: date.slice(0,10)}) //new Date().toISOString().slice(0,10)
  mes_date: Date;

}