/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Create_Post_Schema_Requirements } from '../models/Create_Post_Schema_Requirements';
import type { PostResponse } from '../models/PostResponse';
import type { UpdatePostDto } from '../models/UpdatePostDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * Gets all posts
     * @returns PostResponse List of posts
     * @throws ApiError
     */
    public static postsControllerIndex(): CancelablePromise<Array<PostResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts',
        });
    }
    /**
     * Creates a post
     * @param requestBody
     * @returns PostResponse Post successfully created
     * @throws ApiError
     */
    public static postsControllerStore(
        requestBody: Create_Post_Schema_Requirements,
    ): CancelablePromise<PostResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation failed`,
            },
        });
    }
    /**
     * Gets specific post
     * @param id Post ID
     * @returns PostResponse One post
     * @throws ApiError
     */
    public static postsControllerShow(
        id: string,
    ): CancelablePromise<PostResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid ID format`,
                404: `Post not found`,
            },
        });
    }
    /**
     * Updates a post
     * @param id Post ID
     * @param requestBody
     * @returns PostResponse Post successfully updated
     * @throws ApiError
     */
    public static postsControllerUpdate(
        id: string,
        requestBody: UpdatePostDto,
    ): CancelablePromise<PostResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid ID format or validation error`,
                404: `Post not found`,
            },
        });
    }
    /**
     * Deletes a post
     * @param id Post ID
     * @returns void
     * @throws ApiError
     */
    public static postsControllerDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Invalid ID format`,
                404: `Post not found`,
            },
        });
    }
}
