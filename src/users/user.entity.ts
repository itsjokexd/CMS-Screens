import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { Content } from 'src/content/content.entity';
import { Exclude } from 'class-transformer';
import { SALT_ROUNDS } from 'src/constants';


@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true})
  username: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  async encryptPasswordBeforeInsert() {
    const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
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