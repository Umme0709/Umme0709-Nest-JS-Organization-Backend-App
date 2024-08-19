import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Class } from './class.entity';

@Entity({name:'subjects'})
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bookName: string;

    @Column()
    description: string;

    @ManyToOne(()=> Class, (class_t) => class_t.subjects,
    {
        onDelete: 'CASCADE',
    })
    class: Class;

}