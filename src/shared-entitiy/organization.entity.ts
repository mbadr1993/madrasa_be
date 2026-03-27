import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  orgName: string;

  @Column({ unique: true })
  code: string;

  @Column()
  affiliationBoard: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  emailAddress: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}
