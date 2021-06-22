import { Post } from '../../../post/post.model';

export class ListData {
    entity: string;
    loading: boolean = true;
    rows: Post; // || ...
    initialSort: string;
    columns: ListColumn[]
}

export interface ListColumn {
    prop: string;
    name: string;
}