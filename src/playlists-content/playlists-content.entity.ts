import { Content } from 'src/content/content.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class PlaylistsContent {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playlistId: number;

    @Column()
    contentId: number;
    
    @Column()
    duration: number;

    @Column()
    order: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne((type) => Playlist, playlist => playlist.playlistsContent, {
        onDelete: 'CASCADE',
      })
    playlist: Playlist;
    

    @ManyToOne((type) => Content, content => content.playlistsContent, {
        onDelete: 'CASCADE',
      })
    content: Content;

}
