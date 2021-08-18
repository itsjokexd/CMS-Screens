import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class ConferenceEvent {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne((type) => User, user => user.conferenceEvents, {
        onDelete: 'CASCADE',
      })
    user: User;

    @OneToMany((type) => ConferenceScreen, screens => screens.conferenceEvent, {
      cascade : true,
    })
    screens: ConferenceScreen[];
}