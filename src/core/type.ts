import { ClassTransformOptions } from 'class-transformer';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export type QueryFields = string[];

export type QueryFilter = {
  field: string;
  operator: ComparisonOperator;
  value?: any;
};

export type QueryFilterArr = [string, ComparisonOperator, any?];

export type QueryJoin = {
  field: string;
  select?: QueryFields;
};

export type QueryJoinArr = [string, QueryFields?];

export type QuerySort = {
  field: string;
  order: QuerySortOperator;
};

export type QuerySortArr = [string, QuerySortOperator];

export type QuerySortOperator = 'ASC' | 'DESC';

type DeprecatedCondOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'lt'
  | 'gte'
  | 'lte'
  | 'starts'
  | 'ends'
  | 'cont'
  | 'excl'
  | 'in'
  | 'notin'
  | 'isnull'
  | 'notnull'
  | 'between';

export enum CondOperator {
  EQUALS = '$eq',
  NOT_EQUALS = '$ne',
  GREATER_THAN = '$gt',
  LOWER_THAN = '$lt',
  GREATER_THAN_EQUALS = '$gte',
  LOWER_THAN_EQUALS = '$lte',
  STARTS = '$starts',
  ENDS = '$ends',
  CONTAINS = '$cont',
  EXCLUDES = '$excl',
  IN = '$in',
  NOT_IN = '$notin',
  IS_NULL = '$isnull',
  NOT_NULL = '$notnull',
  BETWEEN = '$between',
  EQUALS_LOW = '$eqL',
  NOT_EQUALS_LOW = '$neL',
  STARTS_LOW = '$startsL',
  ENDS_LOW = '$endsL',
  CONTAINS_LOW = '$contL',
  EXCLUDES_LOW = '$exclL',
  IN_LOW = '$inL',
  NOT_IN_LOW = '$notinL',
}

export type ComparisonOperator = DeprecatedCondOperator | keyof SFieldOperator;

// new search
export type SPrimitivesVal = string | number | boolean;

export type SFiledValues = SPrimitivesVal | Array<SPrimitivesVal>;

export type SFieldOperator = {
  $eq?: SFiledValues;
  $ne?: SFiledValues;
  $gt?: SFiledValues;
  $lt?: SFiledValues;
  $gte?: SFiledValues;
  $lte?: SFiledValues;
  $starts?: SFiledValues;
  $ends?: SFiledValues;
  $cont?: SFiledValues;
  $excl?: SFiledValues;
  $in?: SFiledValues;
  $notin?: SFiledValues;
  $between?: SFiledValues;
  $isnull?: SFiledValues;
  $notnull?: SFiledValues;
  $eqL?: SFiledValues;
  $neL?: SFiledValues;
  $startsL?: SFiledValues;
  $endsL?: SFiledValues;
  $contL?: SFiledValues;
  $exclL?: SFiledValues;
  $inL?: SFiledValues;
  $notinL?: SFiledValues;
  $or?: SFieldOperator;
  $and?: never;
};

export type SField = SPrimitivesVal | SFieldOperator;

export type SFields = {
  [key: string]: SField | Array<SFields | SConditionAND> | undefined;
  $or?: Array<SFields | SConditionAND>;
  $and?: never;
};

export type SConditionAND = {
  $and?: Array<SFields | SConditionAND>;
  $or?: never;
};

export type SConditionKey = '$and' | '$or';

export type SCondition = SFields | SConditionAND;

export type ParamOptionType = 'number' | 'string' | 'uuid';

export interface ParsedRequestParams {
  fields: QueryFields;
  paramsFilter: QueryFilter[];
  classTransformOptions: ClassTransformOptions;
  search: SCondition;
  filter: QueryFilter[];
  or: QueryFilter[];
  join: QueryJoin[];
  sort: QuerySort[];
  limit: number;
  offset: number;
  page: number;
  cache: number;
  includeDeleted: number;
}

export interface CrudRequestOptions {
  query?: QueryOptions;
  routes?: RoutesOptions;
  params?: ParamsOptions;
}

export interface ParamsOptions {
  [key: string]: ParamOption;
}

export interface ParamOption {
  field?: string;
  type?: ParamOptionType;
  enum?: SwaggerEnumType;
  primary?: boolean;
  disabled?: boolean;
}

export interface CrudRequest {
  parsed: ParsedRequestParams;
  options: CrudRequestOptions;
}

export type BaseRouteName =
  | 'getManyBase'
  | 'getOneBase'
  | 'createOneBase'
  | 'createManyBase'
  | 'updateOneBase'
  | 'replaceOneBase'
  | 'deleteOneBase'
  | 'recoverOneBase';

export interface RoutesOptions {
  exclude?: BaseRouteName[];
  only?: BaseRouteName[];
  getManyBase?: GetManyRouteOptions;
  getOneBase?: GetOneRouteOptions;
  createOneBase?: CreateOneRouteOptions;
  createManyBase?: CreateManyRouteOptions;
  updateOneBase?: UpdateOneRouteOptions;
  replaceOneBase?: ReplaceOneRouteOptions;
  deleteOneBase?: DeleteOneRouteOptions;
  recoverOneBase?: RecoverOneRouteOptions;
}

export interface BaseRouteOptions {
  interceptors?: any[];
  decorators?: (PropertyDecorator | MethodDecorator)[];
}

export type GetManyRouteOptions = BaseRouteOptions;

export type GetOneRouteOptions = BaseRouteOptions;

export interface CreateOneRouteOptions extends BaseRouteOptions {
  returnShallow?: boolean;
}

export type CreateManyRouteOptions = BaseRouteOptions;

export interface ReplaceOneRouteOptions extends BaseRouteOptions {
  allowParamsOverride?: boolean;
  returnShallow?: boolean;
}

export interface UpdateOneRouteOptions extends BaseRouteOptions {
  allowParamsOverride?: boolean;
  returnShallow?: boolean;
}

export interface DeleteOneRouteOptions extends BaseRouteOptions {
  returnDeleted?: boolean;
}

export interface RecoverOneRouteOptions extends BaseRouteOptions {
  returnRecovered?: boolean;
}

export interface GetManyDefaultResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

export interface CreateManyDto<T = any> {
  bulk: T[];
}

export interface QueryOptions {
  allow?: QueryFields;
  exclude?: QueryFields;
  persist?: QueryFields;
  filter?: QueryFilterOption;
  join?: JoinOptions;
  sort?: QuerySort[];
  limit?: number;
  maxLimit?: number;
  cache?: number | false;
  alwaysPaginate?: boolean;
  softDelete?: boolean;
}

export type QueryFilterFunction = (
  search?: SCondition,
  getMany?: boolean,
) => SCondition | void;

export type QueryFilterOption =
  | QueryFilter[]
  | SCondition
  | QueryFilterFunction;

export interface JoinOption {
  alias?: string;
  allow?: QueryFields;
  eager?: boolean;
  exclude?: QueryFields;
  persist?: QueryFields;
  select?: false;
  required?: boolean;
}

export interface JoinOptions {
  [key: string]: JoinOption;
}

export type AttributeOf<T> = keyof T;

export type FindManyParams<T> = Pick<IPaginationOptions, 'limit' | 'page'> & {
  includeBy?: AttributeOf<T>[];
  sortBy?: AttributeOf<T>[];
  excludeField?: QueryFields;
  sortOperator?: QuerySortOperator;
};
