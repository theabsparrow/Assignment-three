import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  search(searchAbleFields: string[]) {
    const searchTerm = this.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }
  filter() {
    const queryObject = { ...this.query };
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((ele) => delete queryObject[ele]);
    this.modelQuery = this.modelQuery.find(queryObject);
    return this;
  }
  sort() {
    let sortString = '-createdAt';
    if (this.query?.sortBy) {
      const sortOrder = this.query?.sortOrder === 'desc' ? '-' : '';
      sortString = `${sortOrder}${this.query.sortBy}`;
    }
    this.modelQuery = this.modelQuery.sort(sortString);
    return this;
  }
}

export default QueryBuilder;
