/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//define entity class
@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne(() => Roles, (role) => role.children, { nullable: true })
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  parent: Roles;

  @OneToMany(() => Roles, (role) => role.parent)
  children: Roles[];
}
