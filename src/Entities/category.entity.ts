import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Profile } from './profile.entity';

@Entity({name:'user_categories'})
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(()=> Profile, (user) => user.category,
    {
        cascade: true,
    })
    profiles:Profile[];
    
}