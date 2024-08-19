import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity({ name: 'user_profiles'})
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string;

    @Column()
    bloodGroup: string;

    @ManyToOne(()=> Category, (category) => category.profiles,
    {
        onDelete: 'CASCADE',
    })
    category: Category;

    @OneToOne(() => User, user => user.profile, { onDelete: "CASCADE" })
    user: User;  
}