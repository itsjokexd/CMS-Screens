import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { Content } from 'src/content/content.entity';


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
  created_at: Date;

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

  @OneToMany((type) => ConferenceEvent, conferenceEvents => conferenceEvents.user, {
    cascade : true,
  })
  conferenceEvents: ConferenceEvent[];

  @OneToMany((type) => Content, content => content.user, {
    cascade : true,
  })
  content: Content[];
}