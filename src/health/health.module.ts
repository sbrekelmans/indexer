import { Module } from '@nestjs/common';
import { healthProviders } from './health.providers';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { AnchorModule } from '../anchor/anchor.module';

export const HealthModuleConfig = {
  imports: [LoggerModule, ConfigModule, AnchorModule],
  controllers: [HealthController],
  providers: [
    HealthService,
    ...healthProviders,
  ],
  exports: [
    HealthService,
    ...healthProviders,
  ],
};

@Module(HealthModuleConfig)
export class HealthModule { }