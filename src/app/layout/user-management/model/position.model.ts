export class PostionModel {
  id: number;
  name: string;
  parentId: number;
  childs: Array<PostionModel>;
}
