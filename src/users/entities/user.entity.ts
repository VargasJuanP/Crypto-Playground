import { Network } from "src/network/entities/network.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    username: string;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Network, (network) => network.user)
    networks: Network[];

}
