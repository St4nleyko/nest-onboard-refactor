/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PostResponse = {
    _id: string;
    title: string;
    content: string;
    type: PostResponse.type;
    createdAt: string;
    updatedAt: string;
};
export namespace PostResponse {
    export enum type {
        ARTICLE = 'Article',
        ANNOUNCEMENT = 'Announcement',
        TUTORIAL = 'Tutorial',
    }
}

