import { DataSource } from 'typeorm';
import { configService } from './config.service';

const DBDataSource = new DataSource(configService.getDataSourceConfig());

DBDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export { DBDataSource }; // Use named export instead of default export
