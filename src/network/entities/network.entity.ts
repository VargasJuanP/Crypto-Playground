import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name', 'user'])
export class Network {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "json", default: {} })
    doc: any;

    @ManyToOne(() => User, (user) => user.networks)
    user: User;

}
