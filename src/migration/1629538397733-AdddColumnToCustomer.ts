import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AdddColumnToCustomer1629538397733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('customer', [
      new TableColumn({
        name: 'score',
        type: 'int',
      }),
      new TableColumn({
        name: 'review',
        type: 'string',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('customer', [
      new TableColumn({
        name: 'score',
        type: 'int',
      }),
      new TableColumn({
        name: 'review',
        type: 'string',
      }),
    ]);
  }
}
