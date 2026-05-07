import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from 'src/core/tokens';

type EventPublisher = {
  publish: (event: string, payload: any) => void
};

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(EVENT_PUBLISHER)

    private readonly Publisher: EventPublisher,

  ) {}
  notify(event: string, payload: any) {
    this.Publisher.publish(event, payload);
    return { ok: true };
  }
}