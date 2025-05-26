/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdatePostDto = {
    /**
     * Optional field - min. 1 letter
     */
    title?: string;
    /**
     * Optional field - min. 1 letter
     */
    content?: string;
    type?: UpdatePostDto.type;
};
export namespace UpdatePostDto {
    export enum type {
        ARTICLE = 'Article',
        ANNOUNCEMENT = 'Announcement',
        TUTORIAL = 'Tutorial',
    }
}

