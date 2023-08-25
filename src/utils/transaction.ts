import { DataSource, QueryRunner } from 'typeorm';

// Start database transaction.
// TODO: change this to decorator, it difficult to do for now
export const createTransaction = (dataSource: DataSource) => {
  const runQuery = async <T = unknown>(
    task: (queryRunner: QueryRunner) => T | Promise<T>,
  ): Promise<T> => {
    const queryRunner: QueryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Run task
      const result = await task(queryRunner);

      // When task is finished, save all changes to database
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };

  return runQuery;
};
