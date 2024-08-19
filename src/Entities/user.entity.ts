import { Column, Entity, JoinColumn, ManyToOne, OneToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from './profile.entity';
import { Category } from "./category.entity";
import { Class } from "./class.entity";

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Profile, profile => profile.user, { eager: true })
    @JoinColumn()
    profile: Profile;

    @OneToMany(()=> Class, (class_t) => class_t.user,
    {
        cascade: true,
    })
    classes:Class[];

}