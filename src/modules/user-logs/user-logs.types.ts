import { OmitBaseEntity } from "src/shared/base/base.types";
import {UserLogsEntity} from "../../entities/userLogs.entity";

export type CreatableUserLogs = OmitBaseEntity<UserLogsEntity>;

export type EditableUserLogs = Partial<CreatableUserLogs>;
