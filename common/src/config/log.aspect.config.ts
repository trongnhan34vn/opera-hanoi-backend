import { SetMetadata } from '@nestjs/common';

export const LOG_METADATA_KEY = 'log_metadata_key';

export const Log = () => SetMetadata(LOG_METADATA_KEY, true);