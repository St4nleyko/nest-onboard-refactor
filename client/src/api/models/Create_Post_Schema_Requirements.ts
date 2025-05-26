/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Req for post create
 */
export type Create_Post_Schema_Requirements = {
    /**
     * Required field - min. 1 letter
     */
    title: string;
    /**
     * Not required field - min. 1 letter
     */
    content?: string;
    type: Create_Post_Schema_Requirements.type;
};
export namespace Create_Post_Schema_Requirements {
    export enum type {
        ARTICLE = 'Article',
        ANNOUNCEMENT = 'Announcement',
        TUTORIAL = 'Tutorial',
    }
}

