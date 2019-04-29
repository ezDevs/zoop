import { Endpoint } from './endpoint';
import { MarketplaceEndpoint } from './marketplace';
import { Resource } from './resource';

export interface SellerCreationInfo {

}

export interface CreateDocumentSeller {
    file: File,
    category: string,
    metadata: string | null,
    description: string | null,
}

export interface Document extends Resource {
    resource: 'document';
    name: string,
    status: string,
    path: string,
    extension: string,
    mime_type: string,
    size: number,
    md5: string,
    description: string,
    category: string,
    uploaded_by: object,
    metadata: object,
}

export interface Seller extends Resource {
    resource: 'seller';
}

export class SellerEndpoint extends Endpoint<Seller> {
    constructor(marketplace: MarketplaceEndpoint, id: string) {
        super(marketplace.base + `/sellers/${id}`, marketplace.apiKey, marketplace.apiSecret);
    }

    async get() {
        return this.request('GET');
    }
    
    async createDocument(createDocumentSeller: CreateDocumentSeller) {
        return this.request('POST', '/documents', createDocumentSeller) as Promise<Document>;
    }
}
