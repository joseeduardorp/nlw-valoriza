import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Tag } from "./Tag";
import { User } from "./User";

@Entity("compliments")
class Compliment {
  @PrimaryColumn()

  @PrimaryColumn()
  readonly id: string;

  /* referenciando user_sender */
  @Column()
  user_sender: string;

  @JoinColumn({name: "user_sender"})
  @ManyToOne(() => User)
  userSender: User;

  /* referenciando user_receiver */
  @Column()
  user_receiver: string;

  @JoinColumn({name: "user_receiver"})
  @ManyToOne(() => User)
  userReceiver: User;

  /* referenciando tag_id */
  @Column()
  tag_id: string;

  @JoinColumn({name: "tag_id"})
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Compliment };