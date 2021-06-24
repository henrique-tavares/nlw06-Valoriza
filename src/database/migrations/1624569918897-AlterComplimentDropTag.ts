import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterComplimentDropTag1624569918897 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('compliments', 'fk-compliments.tag_id-tag.id');

    await queryRunner.dropColumn('compliments', 'tag_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'compliments',
      new TableColumn({
        name: "tag_id",
        type: "uuid"
      })
    );

    await queryRunner.createForeignKey(
      "compliments",
      new TableForeignKey({
        name: "fk-compliments.tag_id-tag.id",
        columnNames: [ "tag_id" ],
        referencedTableName: "tags",
        referencedColumnNames: [ "id" ],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      })
    );
  }

}
