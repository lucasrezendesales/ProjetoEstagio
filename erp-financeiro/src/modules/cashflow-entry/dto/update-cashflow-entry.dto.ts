import { PartialType } from '@nestjs/mapped-types';
import { CreateCashFlowEntryDto } from './create-cashflow-entry.dto';

export class UpdateCashFlowEntryDto extends PartialType(CreateCashFlowEntryDto) {}
