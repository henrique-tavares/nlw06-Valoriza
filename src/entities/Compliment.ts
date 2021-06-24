import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
export class Compliment {

  @PrimaryColumn()
  readonly id: string;

  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  userSender: User;

  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor () {
    if (!this.id) {
      this.id = uuid();
    }
  }
}