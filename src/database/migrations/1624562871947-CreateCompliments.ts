import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1624562871947 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "compliments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_sender",
            type: "uuid"
          },
          {
            name: "user_receiver",
            type: "uuid"
          },
          {
            name: "tag_id",
            type: "uuid"
          },
          {
            name: "message",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ],
        foreignKeys: [
          {
            name: "fk-compliments.user_sender-user.id",
            columnNames: [ "user_sender" ],
            referencedTableName: "users",
            referencedColumnNames: [ "id" ],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
          },
          {
            name: "fk-compliments.user_receiver-user.id",
            columnNames: [ "user_receiver" ],
            referencedTableName: "users",
            referencedColumnNames: [ "id" ],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
          },
          {
            name: "fk-compliments.tag_id-tag.id",
            columnNames: [ "tag_id" ],
            referencedTableName: "tags",
            referencedColumnNames: [ "id" ],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('compliments');
  }

}
