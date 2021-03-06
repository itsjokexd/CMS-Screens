import { ConferenceScreen } from 'src/conference-screens/conference-screen.entity';
import { PlaylistsContent } from 'src/playlists-content/playlists-content.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Playlist {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    conferenceScreenId: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => ConferenceScreen, (conferenceScreen: ConferenceScreen) => conferenceScreen.playlist)
    public conferenceScreen: ConferenceScreen;

    @OneToMany((type) => PlaylistsContent, playlistsContent => playlistsContent.playlist, {
        cascade : true,
      })
      playlistsContent: PlaylistsContent[];
}
