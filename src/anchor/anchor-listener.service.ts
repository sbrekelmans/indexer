import { IndexEvent, IndexEventsReturnType } from '../index/index.events';
import { EmitterService } from '../emitter/emitter.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AnchorService } from './anchor.service';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AnchorListenerService implements OnModuleInit {
  private anchorIndexing: 'none' | 'trust' | 'all';

  constructor(
    private readonly indexEmitter: EmitterService<IndexEventsReturnType>,
    private readonly anchorService: AnchorService,
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) { }

  onModuleInit() {
    this.anchorIndexing = this.config.getAnchorIndexing();

    if (this.anchorIndexing === 'none') {
      this.logger.debug(`transaction-listener: Not processing anchor: config set to "none"`);
      return;
    }

    this.onIndexTransaction();
  }

  async onIndexTransaction() {
    this.indexEmitter.on(
      IndexEvent.IndexTransaction,
      (val: IndexEventsReturnType['IndexTransaction']) => this.anchorService.index(val, this.anchorIndexing as 'trust' | 'all'),
    );
  }
}
