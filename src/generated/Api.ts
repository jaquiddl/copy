/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface GrantedAuthority {
  authority?: string;
}

export interface Resource {
  /** @format int64 */
  id?: number;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  experience?: string;
  location?: string;
  active?: boolean;
  password?: string;
  user?: string;
  enabled?: boolean;
  accountNonLocked?: boolean;
  accountNonExpired?: boolean;
  credentialsNonExpired?: boolean;
  authorities?: GrantedAuthority[];
  username?: string;
}

export interface VacationObject {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  approved: boolean;
  billable: boolean;
  active: boolean;
  resource?: Resource;
}

export interface Category {
  /** @format int64 */
  categoryId?: number;
  name?: string;
}

export interface SkillObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  name: string;
  categories?: Category[];
}

export interface RoleObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  role: string;
  assignable: boolean;
  /** @uniqueItems true */
  resources?: Resource[];
}

export interface Profile {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  active?: boolean;
  external?: boolean;
  resource?: Resource;
}

export interface ResourceObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  firstName: string;
  /**
   * @minLength 0
   * @maxLength 45
   */
  lastName: string;
  /**
   * @minLength 0
   * @maxLength 45
   */
  jobTitle: string;
  /**
   * @minLength 0
   * @maxLength 45
   */
  experience: string;
  /**
   * @minLength 0
   * @maxLength 45
   */
  location: string;
  role: Role;
  /** @uniqueItems true */
  vacations?: Vacation[];
  active: boolean;
  /**
   * @minLength 8
   * @maxLength 256
   */
  password: string;
  /**
   * @minLength 0
   * @maxLength 40
   */
  user: string;
  skills?: Skill[];
  profiles?: Profile[];
  subscriptions?: Subscription[];
}

export interface Role {
  /** @format int64 */
  id?: number;
  role?: string;
  assignable?: boolean;
}

export interface Skill {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface Subscription {
  /** @format int64 */
  id?: number;
  endpoint?: string;
  p256dh?: string;
  auth?: string;
}

export interface Vacation {
  /** @format int64 */
  id?: number;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
  approved?: boolean;
  billable?: boolean;
  active?: boolean;
}

export interface ResourceSkillKey {
  /** @format int64 */
  idResource?: number;
  /** @format int64 */
  idSkill?: number;
}

export interface ResourceSkillObject {
  id?: ResourceSkillKey;
  level: string;
  resource: Resource;
  skill: Skill;
}

export interface ProjectObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 2
   * @maxLength 20
   */
  name: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  /** @format int64 */
  projectTypeId: number;
  /** @format int64 */
  idProjectManager: number;
  active?: boolean;
  profiles?: Profile[];
}

export interface ProfileObject {
  /** @format int64 */
  id: number;
  /** @format int64 */
  projectId: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  name: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  active?: boolean;
  external?: boolean;
  skills?: Skill[];
  resource?: Resource;
}

export interface ProfileSkillKey {
  /** @format int64 */
  profileId?: number;
  /** @format int64 */
  skillId?: number;
}

export interface ProfileSkillObject {
  id?: ProfileSkillKey;
  level: string;
  profile: Profile;
  skill: Skill;
}

export interface DocumentObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  name: string;
  document: string;
  resource: Resource;
}

export interface CategoryObject {
  /** @format int64 */
  categoryId?: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  name: string;
  skills?: Skill[];
}

export interface CreateProfileObject {
  /** @format int64 */
  projectId: number;
  /**
   * @minLength 0
   * @maxLength 45
   */
  name: string;
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  active?: boolean;
  external?: boolean;
  skills?: Skill[];
  resource?: Resource;
}

export interface SubscriptionObject {
  /** @format int64 */
  id?: number;
  /**
   * @minLength 0
   * @maxLength 250
   */
  endpoint: string;
  /**
   * @minLength 0
   * @maxLength 257
   */
  p256dh: string;
  /**
   * @minLength 0
   * @maxLength 257
   */
  auth: string;
  resource?: ResourceObject;
}

export interface LoginResponse {
  token?: string;
  /** @format int64 */
  expiresIn?: number;
  role?: string;
  /** @format int64 */
  userId?: number;
}

export interface Project {
  /** @format int64 */
  id?: number;
  name?: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  projectType?: ProjectType;
  resource?: Resource;
  active?: boolean;
}

export interface ProjectType {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface ResourceReportObject {
  /** @format int64 */
  id?: number;
  projectsByType?: Record<string, Project[]>;
  /** @uniqueItems true */
  vacations?: Vacation[];
}

export interface ResourceBenchObject {
  /** @format int64 */
  idResource?: number;
  /** @format date-time */
  sinceWhen?: string;
}

export interface BenchUtilizationObject {
  benchUtilization?: string;
  /** @format double */
  idleTime?: number;
}

export interface ProjectTypeObject {
  /** @format int64 */
  id: number;
  name: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8081";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === "number" ? value : `${value}`
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${
        queryString ? `?${queryString}` : ""
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8081
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  vacations = {
    /**
     * @description Return a list of all vacations requested
     *
     * @tags vacation-controller
     * @name GetAllVacations
     * @summary Return all vacations
     * @request GET:/vacations
     */
    getAllVacations: (params: RequestParams = {}) =>
      this.request<VacationObject[], any>({
        path: `/vacations`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update the dates of a vacation
     *
     * @tags vacation-controller
     * @name UpdateVacation
     * @summary Update vacation services
     * @request PUT:/vacations
     */
    updateVacation: (data: VacationObject, params: RequestParams = {}) =>
      this.request<VacationObject, VacationObject>({
        path: `/vacations`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a new vacation request within the selected dates
     *
     * @tags vacation-controller
     * @name AddVacation
     * @summary Creates a new vacation request
     * @request POST:/vacations
     */
    addVacation: (data: VacationObject, params: RequestParams = {}) =>
      this.request<VacationObject, VacationObject>({
        path: `/vacations`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Dismiss the vacations date for a resource
     *
     * @tags vacation-controller
     * @name DismissVacation
     * @summary Dismiss vacation
     * @request PUT:/vacations/dismiss/{vacationId}
     */
    dismissVacation: (vacationId: number, params: RequestParams = {}) =>
      this.request<VacationObject, any>({
        path: `/vacations/dismiss/${vacationId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Approve the vacations date for a resource
     *
     * @tags vacation-controller
     * @name ApproveVacation
     * @summary Approve vacation
     * @request PUT:/vacations/approve/{vacationId}
     */
    approveVacation: (vacationId: number, params: RequestParams = {}) =>
      this.request<VacationObject, any>({
        path: `/vacations/approve/${vacationId}`,
        method: "PUT",
        ...params,
      }),

    /**
     * @description Returns the correspondent vacation of a given id
     *
     * @tags vacation-controller
     * @name GetOneVacation
     * @summary Return a vacation
     * @request GET:/vacations/{vacationId}
     */
    getOneVacation: (vacationId: number, params: RequestParams = {}) =>
      this.request<VacationObject, any>({
        path: `/vacations/${vacationId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deactivate a vacation request for undesired dates
     *
     * @tags vacation-controller
     * @name CancelVacation
     * @summary Deactivate vacation request
     * @request DELETE:/vacations/{vacationId}
     */
    cancelVacation: (vacationId: number, params: RequestParams = {}) =>
      this.request<VacationObject, any>({
        path: `/vacations/${vacationId}`,
        method: "DELETE",
        ...params,
      }),
  };
  skills = {
    /**
     * @description Returns a list of all the skills
     *
     * @tags skill-controller
     * @name GetAllSkills
     * @summary Returns all skills
     * @request GET:/skills
     */
    getAllSkills: (params: RequestParams = {}) =>
      this.request<SkillObject[], any>({
        path: `/skills`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Updates the skill sent as request body
     *
     * @tags skill-controller
     * @name UpdateSkill
     * @summary Updates a skill
     * @request PUT:/skills
     */
    updateSkill: (data: SkillObject, params: RequestParams = {}) =>
      this.request<SkillObject, SkillObject>({
        path: `/skills`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a skill with a given name by the request
     *
     * @tags skill-controller
     * @name AddSkill
     * @summary Creates a new skill
     * @request POST:/skills
     */
    addSkill: (data: SkillObject, params: RequestParams = {}) =>
      this.request<SkillObject, SkillObject>({
        path: `/skills`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns the correspondent skill of a given id
     *
     * @tags skill-controller
     * @name GetOneSkill
     * @summary Returns a skill
     * @request GET:/skills/{skillId}
     */
    getOneSkill: (skillId: number, params: RequestParams = {}) =>
      this.request<SkillObject, any>({
        path: `/skills/${skillId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deletes the correspondent skill of a given id
     *
     * @tags skill-controller
     * @name DeleteSkill
     * @summary Deletes a skill
     * @request DELETE:/skills/{skillId}
     */
    deleteSkill: (skillId: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/skills/${skillId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns a skill-gap report
     *
     * @tags skill-controller
     * @name GetSkillGap
     * @summary Returns a skills report
     * @request GET:/skills/report
     */
    getSkillGap: (params: RequestParams = {}) =>
      this.request<Record<string, object>[], any>({
        path: `/skills/report`,
        method: "GET",
        ...params,
      }),
  };
  roles = {
    /**
     * @description Get everyone of the roles
     *
     * @tags role-controller
     * @name GetAllRoles
     * @summary Get all roles
     * @request GET:/roles
     */
    getAllRoles: (params: RequestParams = {}) =>
      this.request<RoleObject[], any>({
        path: `/roles`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Update the role information
     *
     * @tags role-controller
     * @name UpdateRole
     * @summary Update role information
     * @request PUT:/roles
     */
    updateRole: (data: RoleObject, params: RequestParams = {}) =>
      this.request<RoleObject, RoleObject>({
        path: `/roles`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a new role with the data
     *
     * @tags role-controller
     * @name AddRole
     * @summary Creates a new role
     * @request POST:/roles
     */
    addRole: (data: RoleObject, params: RequestParams = {}) =>
      this.request<RoleObject, RoleObject>({
        path: `/roles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Get the role for the specific id
     *
     * @tags role-controller
     * @name GetOneRole
     * @summary Get a role
     * @request GET:/roles/{roleId}
     */
    getOneRole: (roleId: number, params: RequestParams = {}) =>
      this.request<RoleObject, any>({
        path: `/roles/${roleId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Delete a role completely, only if it doesn't has any
     *
     * @tags role-controller
     * @name DeleteRole
     * @summary Delete role request
     * @request DELETE:/roles/{roleId}
     */
    deleteRole: (roleId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/roles/${roleId}`,
        method: "DELETE",
        ...params,
      }),
  };
  resources = {
    /**
     * @description Returns a list of all resources
     *
     * @tags resource-controller
     * @name GetAllResources
     * @summary Returns all Resources
     * @request GET:/resources
     */
    getAllResources: (params: RequestParams = {}) =>
      this.request<ResourceObject[], any>({
        path: `/resources`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a resource, with all the parameters given
     *
     * @tags resource-controller
     * @name UpdateResource
     * @summary Updates a Resource
     * @request PUT:/resources
     */
    updateResource: (data: ResourceObject, params: RequestParams = {}) =>
      this.request<ResourceObject, ResourceObject>({
        path: `/resources`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a new resource, with all the parameters given
     *
     * @tags resource-controller
     * @name CreateResource
     * @summary Creates a new Respurce
     * @request POST:/resources
     */
    createResource: (data: ResourceObject, params: RequestParams = {}) =>
      this.request<ResourceObject, ResourceObject>({
        path: `/resources`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a resource given an id
     *
     * @tags resource-controller
     * @name GetResourceById
     * @summary Returns a resource
     * @request GET:/resources/{resourceId}
     */
    getResourceById: (resourceId: number, params: RequestParams = {}) =>
      this.request<ResourceObject, any>({
        path: `/resources/${resourceId}`,
        method: "GET",
        ...params,
        type: ContentType.Json,
        format: "json",
      }),

    /**
     * @description Deletes a resource, with all the parameters given
     *
     * @tags resource-controller
     * @name DeleteResource
     * @summary Deletes a Resource
     * @request DELETE:/resources/{resourceId}
     */
    deleteResource: (resourceId: number, params: RequestParams = {}) =>
      this.request<ResourceObject, ResourceObject>({
        path: `/resources/${resourceId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns a resource report of a given an id
     *
     * @tags resource-controller
     * @name GetResourceReportById
     * @summary Returns a resource report
     * @request GET:/resources/report/{resourceId}
     */
    getResourceReportById: (resourceId: number, params: RequestParams = {}) =>
      this.request<ResourceReportObject, any>({
        path: `/resources/report/${resourceId}`,
        method: "GET",
        ...params,
      }),
  };
  resourceSkill = {
    /**
     * @description Returns a list of all resources-skills
     *
     * @tags resource-skill-controller
     * @name GetAllResourceSkill
     * @summary Returns all Resources-Skill entries
     * @request GET:/resource-skill
     */
    getAllResourceSkill: (params: RequestParams = {}) =>
      this.request<ResourceSkillObject[], any>({
        path: `/resource-skill`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Updates a resourceSkill , with all the new level
     *
     * @tags resource-skill-controller
     * @name UpdateLevel
     * @summary Updates Level
     * @request PUT:/resource-skill
     */
    updateLevel: (data: ResourceSkillObject, params: RequestParams = {}) =>
      this.request<ResourceSkillObject, ResourceSkillObject>({
        path: `/resource-skill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a resource skill paired registry with both ids
     *
     * @tags resource-skill-controller
     * @name GetResourceSkill
     * @summary Returns a resource skill pair
     * @request GET:/resource-skill/resource/{resourceId}/skill/{skillId}
     */
    getResourceSkill: (
      resourceId: number,
      skillId: number,
      params: RequestParams = {}
    ) =>
      this.request<ResourceSkillObject, any>({
        path: `/resource-skill/resource/${resourceId}/skill/${skillId}`,
        method: "GET",
        ...params,
      }),
  };
  projects = {
    /**
     * @description Returns a set of active projects
     *
     * @tags project-controller
     * @name GetAllActiveProjects
     * @summary Returns all active projects
     * @request GET:/projects
     */
    getAllActiveProjects: (params: RequestParams = {}) =>
      this.request<ProjectObject[], any>({
        path: `/projects`,
        method: "GET",
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a project with the provided details
     *
     * @tags project-controller
     * @name UpdateProject
     * @summary Updates a Project
     * @request PUT:/projects
     */
    updateProject: (data: ProjectObject, params: RequestParams = {}) =>
      this.request<ProjectObject, ProjectObject>({
        path: `/projects`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Saves a new project with the provided details
     *
     * @tags project-controller
     * @name AddProject
     * @summary Saves a project
     * @request POST:/projects
     */
    addProject: (data: ProjectObject, params: RequestParams = {}) =>
      this.request<ProjectObject, ProjectObject>({
        path: `/projects`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a projects by its corresponding id
     *
     * @tags project-controller
     * @name GetProjectById
     * @summary Returns a project
     * @request GET:/projects/{projectId}
     */
    getProjectById: (projectId: number, params: RequestParams = {}) =>
      this.request<ProjectObject, any>({
        path: `/projects/${projectId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Saves active as false to deactivate project
     *
     * @tags project-controller
     * @name DeactivateProject
     * @summary Deactivates an existing project
     * @request DELETE:/projects/{projectId}
     */
    deactivateProject: (projectId: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${projectId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns a project report of a given id
     *
     * @tags project-controller
     * @name GetReportById
     * @summary Returns a project report
     * @request GET:/projects/report/{projectId}
     */
    getReportById: (projectId: number, params: RequestParams = {}) =>
      this.request<ProjectObject, any>({
        path: `/projects/report/${projectId}`,
        method: "GET",
        ...params,
      }),
  };
  profiles = {
    /**
     * @description Returns a list of all the profiles
     *
     * @tags profile-controller
     * @name GetAllCategories
     * @summary Returns all profiles
     * @request GET:/profiles
     */
    getAllCategories: (params: RequestParams = {}) =>
      this.request<ProfileObject[], any>({
        path: `/profiles`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Updates a profile request for a specified project
     *
     * @tags profile-controller
     * @name UpdateProfile
     * @summary Updates a profile
     * @request PUT:/profiles
     */
    updateProfile: (data: ProfileObject, params: RequestParams = {}) =>
      this.request<ProfileObject, ProfileObject>({
        path: `/profiles`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a profile request for a specified project
     *
     * @tags profile-controller
     * @name CreateProfile
     * @summary Creates a new profile request
     * @request POST:/profiles
     */
    createProfile: (data: CreateProfileObject, params: RequestParams = {}) =>
      this.request<ProfileObject, ProfileObject>({
        path: `/profiles`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the correspondent profile of a given id
     *
     * @tags profile-controller
     * @name GetOneProfile
     * @summary Returns a profile
     * @request GET:/profiles/{profileId}
     */
    getOneProfile: (profileId: number, params: RequestParams = {}) =>
      this.request<ProfileObject, any>({
        path: `/profiles/${profileId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes a profile request for a specified project
     *
     * @tags profile-controller
     * @name DeleteProfile
     * @summary Deletes a profile
     * @request DELETE:/profiles/{profileId}
     */
    deleteProfile: (profileId: number, params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/profiles/${profileId}`,
        method: "DELETE",
        ...params,
      }),
  };
  profileSkill = {
    /**
     * @description Returns a list of all profile-skills
     *
     * @tags profile-skill-controller
     * @name GetAllProfileSkill
     * @summary Returns all Profile-skill entries
     * @request GET:/profile-skill
     */
    getAllProfileSkill: (params: RequestParams = {}) =>
      this.request<ProfileSkillObject[], any>({
        path: `/profile-skill`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates a Profile-Skill , with a new level
     *
     * @tags profile-skill-controller
     * @name UpdateLevelOfProfileSKill
     * @summary Update ProfileSkill level
     * @request PUT:/profile-skill
     */
    updateLevelOfProfileSKill: (
      data: ProfileSkillObject,
      params: RequestParams = {}
    ) =>
      this.request<ProfileSkillObject, ProfileSkillObject>({
        path: `/profile-skill`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a profile skill paired registry with both ids
     *
     * @tags profile-skill-controller
     * @name GetProfileSkill
     * @summary Returns a profile-skill entry
     * @request GET:/profile-skill/profile/{profileId}/skill/{skillId}
     */
    getProfileSkill: (
      profileId: number,
      skillId: number,
      params: RequestParams = {}
    ) =>
      this.request<ProfileSkillObject, any>({
        path: `/profile-skill/profile/${profileId}/skill/${skillId}`,
        method: "GET",
        ...params,
      }),
  };
  docs = {
    /**
     * @description Gets a List of documents
     *
     * @tags document-controller
     * @name DocumentObject
     * @summary Gets all documents
     * @request GET:/docs
     */
    documentObject: (params: RequestParams = {}) =>
      this.request<DocumentObject[], DocumentObject[]>({
        path: `/docs`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Updates a document, with all the parameters given
     *
     * @tags document-controller
     * @name UpdateDocument
     * @summary Updates a document
     * @request PUT:/docs
     */
    updateDocument: (data: DocumentObject, params: RequestParams = {}) =>
      this.request<DocumentObject, DocumentObject>({
        path: `/docs`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a new document, with all the parameters given
     *
     * @tags document-controller
     * @name CreateDocument
     * @summary Creates a new document
     * @request POST:/docs
     */
    createDocument: (data: DocumentObject, params: RequestParams = {}) =>
      this.request<DocumentObject, DocumentObject>({
        path: `/docs`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Returns a document given an id
     *
     * @tags document-controller
     * @name GetDocumentById
     * @summary Returns a document
     * @request GET:/docs/{documentId}
     */
    getDocumentById: (documentId: number, params: RequestParams = {}) =>
      this.request<DocumentObject, any>({
        path: `/docs/${documentId}`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Deletes a document, with all the parameters given
     *
     * @tags document-controller
     * @name DeleteDocument
     * @summary Deletes a document
     * @request DELETE:/docs/{documentId}
     */
    deleteDocument: (documentId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/docs/${documentId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns a document given an the resource id
     *
     * @tags document-controller
     * @name GetDocumentsByResourceId
     * @summary Returns a document
     * @request GET:/docs/resource/{resourceId}
     */
    getDocumentsByResourceId: (
      resourceId: number,
      params: RequestParams = {}
    ) =>
      this.request<DocumentObject[], any>({
        path: `/docs/resource/${resourceId}`,
        method: "GET",
        ...params,
      }),
  };
  categories = {
    /**
     * @description Returns a list of all the categories
     *
     * @tags category-controller
     * @name GetAllCategories1
     * @summary Returns all categories
     * @request GET:/categories
     */
    getAllCategories1: (params: RequestParams = {}) =>
      this.request<CategoryObject[], any>({
        path: `/categories`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the category sent as request body
     *
     * @tags category-controller
     * @name UpdateCategory
     * @summary Updates a category
     * @request PUT:/categories
     */
    updateCategory: (data: CategoryObject, params: RequestParams = {}) =>
      this.request<CategoryObject, CategoryObject>({
        path: `/categories`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Creates a category with a given name by the request
     *
     * @tags category-controller
     * @name AddCategory
     * @summary Creates a new category
     * @request POST:/categories
     */
    addCategory: (data: CategoryObject, params: RequestParams = {}) =>
      this.request<CategoryObject, CategoryObject>({
        path: `/categories`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Deletes the correspondent category of a given id
     *
     * @tags category-controller
     * @name DeleteCategory
     * @summary Deletes a category
     * @request DELETE:/categories
     */
    deleteCategory: (params: RequestParams = {}) =>
      this.request<string, string>({
        path: `/categories`,
        method: "DELETE",
        ...params,
      }),

    /**
     * @description Returns the correspondent category of a given id
     *
     * @tags category-controller
     * @name GetOneCategory
     * @summary Returns a category
     * @request GET:/categories/{categoryId}
     */
    getOneCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<CategoryObject, any>({
        path: `/categories/${categoryId}`,
        method: "GET",
        ...params,
      }),
  };
  notifications = {
    /**
     * No description
     *
     * @tags push-controller
     * @name Unsubscribe
     * @request POST:/notifications/unsubscribe
     */
    unsubscribe: (data: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notifications/unsubscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags push-controller
     * @name Subscribe
     * @request POST:/notifications/subscribe
     */
    subscribe: (data: SubscriptionObject, params: RequestParams = {}) =>
      this.request<SubscriptionObject, any>({
        path: `/notifications/subscribe`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags authentication-controller
     * @name Authenticate
     * @request POST:/auth/login
     */
    authenticate: (data: ResourceObject, params: RequestParams = {}) =>
      this.request<LoginResponse, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  reports = {
    /**
     * @description Returns all resources currently on the bench and since when
     *
     * @tags report-controller
     * @name GetBenchReport
     * @summary Returns the bench reports
     * @request GET:/reports
     */
    getBenchReport: (params: RequestParams = {}) =>
      this.request<ResourceBenchObject[], any>({
        path: `/reports`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Returns the bench utilization comparative from all resourcesand idle time
     *
     * @tags report-controller
     * @name GetReport
     * @summary Returns bench utilization
     * @request GET:/reports/bench
     */
    getReport: (params: RequestParams = {}) =>
      this.request<BenchUtilizationObject, any>({
        path: `/reports/bench`,
        method: "GET",
        ...params,
      }),
  };
  projectTypes = {
    /**
     * @description Returns a set of project types
     *
     * @tags project-type-controller
     * @name GetAllProjectTypes
     * @summary Returns all project types
     * @request GET:/projectTypes
     */
    getAllProjectTypes: (params: RequestParams = {}) =>
      this.request<ProjectTypeObject[], any>({
        path: `/projectTypes`,
        method: "GET",
        ...params,
      }),

    /**
     * @description Returns a project type by its corresponding id
     *
     * @tags project-type-controller
     * @name GetProjectTypeById
     * @summary Returns a project type
     * @request GET:/projectTypes/{projectTypeId}
     */
    getProjectTypeById: (projectTypeId: number, params: RequestParams = {}) =>
      this.request<ProjectTypeObject, any>({
        path: `/projectTypes/${projectTypeId}`,
        method: "GET",
        ...params,
      }),
  };
}
