import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateManyToManyComplimentsTags1624570916157 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "compliments_tags_tags",
        columns: [
          {
            name: "complimentsId",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "tagsId",
            type: "uuid",
            isPrimary: true
          }
        ],
        foreignKeys: [
          {
            columnNames: [ "complimentsId" ],
            referencedTableName: "compliments",
            referencedColumnNames: [ "id" ],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
          },
          {
            columnNames: [ "tagsId" ],
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
    await queryRunner.dropTable("compliments_tags_tags");
  }

}
