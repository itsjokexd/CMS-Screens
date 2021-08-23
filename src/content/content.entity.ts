import { PlaylistsContent } from 'src/playlists-content/playlists-content.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, BeforeInsert, BeforeUpdate, Timestamp, CreateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { ContentType } from '../common/enums/content-type.enum';

@Entity()
export class Content {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    name: string;

    @Column()
    type: ContentType;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany((type) => PlaylistsContent, playlistsContent => playlistsContent.content, {
        cascade : true,
      })
      playlistsContent: PlaylistsContent[];

      @ManyToOne((type) => User, user => user.content, {
        onDelete: 'CASCADE',
      })
    user: User;

}
