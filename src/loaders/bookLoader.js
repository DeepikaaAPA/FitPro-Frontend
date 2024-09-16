import bookServices from "../services/bookServices";

const bookLoader = async ({ params }) => {
    const bookId = params.id;

    const response = await bookServices.getBook(bookId);

    return response.data;
}

export default bookLoader;