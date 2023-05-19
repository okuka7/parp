import { multiProvide } from '@lib/multiProvide';
import { Module } from '@nestjs/common';
import { ProfilePersistenceAdapter } from './adapter/outgoing/profile.persistence.adapter';
import { GET_PROFILE_QUERY } from './application/port/incoming/get-user.query';
import { LOAD_PROFILE_PORT } from './application/port/outgoing/load.profile.port';
import { UPDATE_PROFILE_PORT } from './application/port/outgoing/update.profile.port';
import { GetProfileService } from './application/service/get-user.service';

@Module({
  providers: [
    {
      provide: GET_PROFILE_QUERY,
      useClass: GetProfileService,
    },
    ...multiProvide({
      provide: [LOAD_PROFILE_PORT, UPDATE_PROFILE_PORT],
      useClass: ProfilePersistenceAdapter,
    }),
  ],
})
export class ProfileModule {}
