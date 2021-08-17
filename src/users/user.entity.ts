import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  async encryptPasswordBeforeInsert(){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }

  @BeforeUpdate()
  async encryptPasswordBeforeUpdate(){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
}