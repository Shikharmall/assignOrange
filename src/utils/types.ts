export interface Artwork {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string | null;
    inscriptions: string;
    date_start: string;
    date_end: string;
}

export interface ArtApiResponse {
    data: Artwork[];
    pagination: {
        total: number;
        limit: number;
        offset: number;
        total_pages: number;
        current_page: number;
        next_url: string | null;
    };

}

export interface TableColumn {
    field: string;
    header: string;
}

export interface City {
    name: string,
    code: string
}