import { ConferenceEvent } from 'src/conference-events/conference-event.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class ConferenceScreen {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    conferenceEventId: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne((type) => ConferenceEvent, conferenceEvent => conferenceEvent.screens, {
        onDelete: 'CASCADE',
      })
    conferenceEvent: ConferenceEvent;

    @OneToOne(() => Playlist, (playlist: Playlist) => playlist.conferenceScreen)
    public playlist: Playlist;
}