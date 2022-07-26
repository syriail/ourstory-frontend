export type Tags = Record<string, string>
export type Story = {
    objectID: string,
    collectionId:string,
    collectionName: string,
    storyTitle: string,
    storyType: string[]
    storyAbstraction?: string,
    storyTranscript?: string,
    storyCollectorName?: string,
    storyTellerName?: string,
    storyTellerGender?: string,
    storyTellerPlaceOfOrigin?: string,
    storyTellerResidency?:string,
    storyTellerAge?: number
}
export type Facet = {
    attribute: string,
    values: {value: string, count: number}[]
}
export type SearchResult = {
    stories: Story[],
    total: number,
    page: number,
    pageSize: number,
    pages: number,
    facets: Facet[]
}

