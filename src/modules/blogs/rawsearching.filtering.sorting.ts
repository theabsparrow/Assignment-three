// const queryObject = { ...query };
// blog searching

// const search = query?.search || '';
// const searchQuery = Blogs.find({
//   $or: blogSearchableFields.map((field) => ({
//     [field]: { $regex: search, $options: 'i' },
//   })),
// });
// blog filtering
// const excludeFields = ['search', 'sortBy', 'sortOrder'];
// excludeFields.forEach((ele) => delete queryObject[ele]);
// const filterQuery = searchQuery.find(queryObject).populate('author');
// blog sorting
// let sortString = '-createdAt';
// if (query?.sortBy) {
//   const sortOrder = query?.sortOrder === 'desc' ? '-' : '';
//   sortString = `${sortOrder}${query.sortBy}`;
// }
// const result = await filterQuery.sort(sortString);
