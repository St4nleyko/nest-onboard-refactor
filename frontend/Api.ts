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

export interface PostResponse {
  /** @example "abc123" */
  _id: string;
  /** @example "My first post" */
  title: string;
  /** @example "This is the content of the post." */
  content: string;
  /** @example "Article" */
  type: "Article" | "Announcement" | "Tutorial";
  /** @example "2024-01-01T12:00:00Z" */
  createdAt: string;
  /** @example "2024-01-01T12:30:00Z" */
  updatedAt: string;
}

/** Req for post create */
export interface CreatePostSchemaRequirements {
  /**
   * Required field - min. 1 letter
   * @minLength 1
   * @default "Post Placeholder"
   */
  title: string;
  /**
   * Not required field - min. 1 letter
   * @minLength 1
   * @default "Hello Text"
   * @example "Hello Text"
   */
  content?: string;
  /** @example "Article" */
  type: "Article" | "Announcement" | "Tutorial";
}

export interface UpdatePostDto {
  /**
   * Optional field - min. 1 letter
   * @minLength 1
   * @default "Post Placeholder"
   * @example "Post Placeholder"
   */
  title?: string;
  /**
   * Optional field - min. 1 letter
   * @minLength 1
   * @default "Hello Text"
   * @example "Hello Text"
   */
  content?: string;
  type?: "Article" | "Announcement" | "Tutorial";
}

export interface CreateUserDto {
  /** @example "user@gmailz.com" */
  email: string;
  /** @example "heslo123" */
  password: string;
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
    securityData: SecurityDataType | null,
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
  public baseUrl: string = "";
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
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
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
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
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
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
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
    cancelToken: CancelToken,
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
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
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
      },
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
 * @title Available models
 * @version 1.0
 * @contact
 *
 * Post swagger
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  posts = {
    /**
     * No description
     *
     * @tags Posts
     * @name PostsControllerIndex
     * @summary Gets all posts
     * @request GET:/posts
     * @secure
     */
    postsControllerIndex: (params: RequestParams = {}) =>
      this.request<PostResponse[], any>({
        path: `/posts`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsControllerStore
     * @summary Creates a post
     * @request POST:/posts
     * @secure
     */
    postsControllerStore: (
      data: CreatePostSchemaRequirements,
      params: RequestParams = {},
    ) =>
      this.request<PostResponse, void>({
        path: `/posts`,
        method: "POST",
        body: data,
        secure: false,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsControllerShow
     * @summary Gets specific post
     * @request GET:/posts/{id}
     * @secure
     */
    postsControllerShow: (id: string, params: RequestParams = {}) =>
      this.request<PostResponse, void>({
        path: `/posts/${id}`,
        method: "GET",
        secure: false,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsControllerUpdate
     * @summary Updates a post
     * @request PUT:/posts/{id}
     * @secure
     */
    postsControllerUpdate: (
      id: string,
      data: UpdatePostDto,
      params: RequestParams = {},
    ) =>
      this.request<PostResponse, void>({
        path: `/posts/${id}`,
        method: "PUT",
        body: data,
        secure: false,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PostsControllerDestroy
     * @summary Deletes a post
     * @request DELETE:/posts/{id}
     * @secure
     */
    postsControllerDestroy: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}`,
        method: "DELETE",
        secure: false,
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Login and get JWT token
     * @request POST:/auth/login
     */
    authControllerLogin: (
      data: {
        /** @example "user@example.com" */
        email: string;
        /** @example "password123" */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Logout user by clearing cookisz
     * @request POST:/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerGetCsrfToken
     * @summary Get CSRF token for protected requests
     * @request GET:/auth/csrf-token
     */
    authControllerGetCsrfToken: (params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/csrf-token`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerMe
     * @summary get user to keep the session
     * @request GET:/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
        this.request<{ email: string; userId: string }, any>({
        path: `/auth/me`,
        method: "GET",
        secure: false,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRegister
     * @summary Register a new user
     * @request POST:/users/register
     */
    usersControllerRegister: (
      data: CreateUserDto,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/users/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerGetAll
     * @summary Get all users
     * @request GET:/users
     */
    usersControllerGetAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users`,
        method: "GET",
        ...params,
      }),
  };
}
