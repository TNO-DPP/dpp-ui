export interface PassportType {
    label: string;
    value: string;
}

export interface BatchId {
    label: string;
    value: string;
}

export interface CountryCode {
    label: string;
    value: string;
}

export interface DppTemplate {
    template_id: string;
    version?: string;
}

export interface Facility {
    id: string;
    name: string;
    address?: string | null;
    country_code?: string | null;
    description?: string | null;
}

export interface RepositoryAddress {
    hostname: string;
}

export interface Entity {
    id: string;
    name: string;
    full_name?: string | null;
    facility?: Facility[] | null;
    repository_address?: RepositoryAddress[] | null;
    batch_id?: string | null;
}

export interface DigitalProductPassport {
    passport_type: string; // Type of DigitalProductPassport
    id: string; // Unique identifier
    title: string; // Title string for display

    instantiated_from?: DppTemplate | null;
    manufacturer?: Entity | null;
    economic_operator?: Entity | Entity[] | null;
    current_owner?: Entity | null;
    known_past_owners?: Entity | Entity[] | null;

    registration_id?: string | null;
    batch_id?: string | null;
    creation_timestamp?: string | null;
    destruction_timestamp?: string | null;
    tags?: string[];

    parent?: string | null;

    events?: { [key: string]: string[] };
    attributes?: { [key: string]: any };
    credentials?: (Record<string, any> | string)[];
    attachments?: string[];
    subpassports?: string[];
}

export interface DppAttachment {
    id: string;
    description: string;
    file_name: string;
    image_thumbnail_url: string;
    image_url: string;
    source: string;
    source_id: string;
    type: string;
}
