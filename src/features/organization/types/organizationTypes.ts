export type Organization = {
    id: string;
    name: string,
    slug: string
}
export type GetOrganizationResponse = {
    status: string,
    message: string,
    data: {
        organizations: Organization[];
    }
}