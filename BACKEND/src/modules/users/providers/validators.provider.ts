import { Provider } from '@nestjs/common';
import { IsUserAlreadyExistValidator } from '../validators/is-user-already-exist.validator';
import { IsUserExistsValidator } from '../validators/is-user-exists.validator';

export const USER_VALIDATORS: Provider[] = [
  IsUserAlreadyExistValidator,
  IsUserExistsValidator,
];
