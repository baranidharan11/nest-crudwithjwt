import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './entitties/user-entity';

export const Dbconnection = [
  {
    provide: 'DataSource',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [UserEntity],
        logging: true,
      });
      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
