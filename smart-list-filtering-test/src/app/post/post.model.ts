export interface Post {
  filter(arg0: (item: any) => boolean): import("../shared/components/list/list.model").ListData;
  map(arg0: (item: any) => any): Iterable<unknown>;
  id?: number;
  title?: string;
  body?: string;
  userId?: number;
}
