import { ExpandProvider } from '@lib/provider';
import { Module } from '@nestjs/common';
import { ProfileEventAdapter } from './adapter/incoming/profile.event.adapter';
import { ProfilePersistenceAdapter } from './adapter/outgoing/profile.persistence.adapter';
import { CREATE_PROFILE_USECASE } from './application/port/incoming/create.profile.usecase';
import { GET_PROFILE_QUERY } from './application/port/incoming/get-user.query';
import { CREATE_PROFILE_PORT } from './application/port/outgoing/create-profile.port';
import { LOAD_PROFILE_PORT } from './application/port/outgoing/load.profile.port';
import { UPDATE_PROFILE_PORT } from './application/port/outgoing/update.profile.port';
import { CreateProfileService } from './application/service/create.profile.service';
import { GetProfileService } from './application/service/get-user.service';

@Module({
  providers: ExpandProvider([
    {
      provide: GET_PROFILE_QUERY,
      useClass: GetProfileService,
    },
    {
      provide: CREATE_PROFILE_USECASE,
      useClass: CreateProfileService,
    },
    {
      provide: [CREATE_PROFILE_PORT, LOAD_PROFILE_PORT, UPDATE_PROFILE_PORT],
      useClass: ProfilePersistenceAdapter,
    },
  ]),
  controllers: [ProfileEventAdapter],
})
export class ProfileModule {}
