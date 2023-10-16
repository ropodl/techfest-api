exports.paginate = async (model, page, itemsPerPage, query, sort) => {
    // Get the total number of documents in the collection
    const totalItems = await model.countDocuments(query);

    // Calculate the total number of pages
    const totalPage = Math.ceil(totalItems / itemsPerPage);

    // Calculate the offset of the first document to return
    const offset = (page - 1) * itemsPerPage;

    if (itemsPerPage === 0) {
        // Disable pagination and return all of the documents in the collection
        const documents = await model.find(query).sort(sort);
        return {
            documents, pagination: {
                totalPage: 1,
                totalItems,
                itemsPerPage: totalItems,
                currentPage: page,
            }
        };
    }

    // Get a list of documents from the collection
    const documents = await model.find(query)
        .sort(sort)
        .skip(offset)
        .limit(itemsPerPage);

    // Return the paginated list of documents
    return {
        documents,
        pagination: {
            totalPage,
            totalItems,
            itemsPerPage,
            currentPage: page,
        },
    };
}