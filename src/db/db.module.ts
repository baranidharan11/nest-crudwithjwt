import { Module } from '@nestjs/common';
import { Dbconnection } from './db.source';

@Module({ providers: [...Dbconnection], exports: [...Dbconnection] })
export class DbModule {}
