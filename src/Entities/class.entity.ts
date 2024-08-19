import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity({name:'classes'})
export class Class {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(()=> User, (user) => user.classes,
    {
        onDelete: 'CASCADE',
    })
    user: User;

    @OneToMany(()=> Subject, (subject) => subject.class,
    {
        cascade: true,
    })
    subjects:Subject[];

}