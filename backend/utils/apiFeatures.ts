export interface QueryString {
  page?: number;
  sort?: string;
  limit?: number;
  fields?: string;
  populate?: string;
  filters?: Record<string, any>;
}

class ApiFeatures<T> {
  constructor(
    public model: any,
    public queryString: QueryString,
  ) {
    this.model = model;
    this.queryString = queryString;
  }

  filters(): this {
    if (this.queryString) {
      const queryObj: QueryString = { ...this.queryString };
      const fieldsItems: string[] = [
        'page',
        'sort',
        'limit',
        'fields',
        'populate',
      ];
      for (const key of fieldsItems) {
        delete queryObj[key];
      }
      this.model = this.model.find(queryObj);
    }else{
        this.model = this.model.find({}); 
    }

    return this;
  }

  sort(): this {
    if (this?.queryString?.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort('-createdAt');
    }

    return this;
  }

  limitFields(): this {
    if (this?.queryString?.fields) {
      const fieldsBy = this.queryString.fields.split(',').join(' ');
      this.model = this.model.select(fieldsBy);
    } else {
      this.model = this.model.select('-__v');
    }

    return this;
  }

  paginate(): this {
    const page: number = Number(this.queryString.page) || 1;
    let limit: number = Number(this.queryString.limit) || 20;
    const skip: number = (page - 1) * limit;

    this.model = this.model.skip(skip).limit(limit);

    return this;
  }

  populate(): this {
    if (this?.queryString?.populate) {
      const populateBy = this.queryString.populate.split(',').join(' ');
      this.model = this.model.populate(populateBy);
    }

    return this;
  }

  secondPopulate(p: string): this {
    if (p) {
      this.model = this.model.populate(p);
    }

    return this;
  }
}

export default ApiFeatures;
