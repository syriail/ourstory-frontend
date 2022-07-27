export type Tags = Record<string, string>
type TagValue = {
    storyId: string,
    collectionId: string,
    locale: string,
    slug: string,
    name: string,
    value: string,
}
export enum MediaFormat {
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
  }
export type MediaFile = {
    format: MediaFormat,
    mediaPath: string
  }
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
    storyTellerAge?: number,
    mediaFiles?:MediaFile[],
    tags?: TagValue[]
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

