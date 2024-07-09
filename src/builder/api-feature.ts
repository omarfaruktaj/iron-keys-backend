import { FilterQuery, Query } from 'mongoose';
import { QueryString } from '../interfaces/query';

class ApiFeatures<T> {
    constructor(
        public query: Query<T[], T>,
        public queryString: QueryString,
    ) {
        this.query = query;
        this.queryString = queryString;
    }

    search(searchableFields: string[]) {
        if (searchableFields.length && this.queryString.searchTerm) {
            const searchTerm = this.queryString.searchTerm;

            this.query = this.query.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.queryString };

        const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

        excludedFields.forEach((el) => delete queryObj[el]);

        //advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;
        const skip = (page - 1) * limit;

        this.query.skip(skip).limit(limit);
        return this;
    }

    apply(searchableFields: string[]) {
        this.filter().search(searchableFields).sort().limitFields().paginate();

        return this.query;
    }
}

export default ApiFeatures;
