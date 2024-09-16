import bookServices from "../services/bookServices"

const booksLoader = async () => {
    const books = await bookServices.getBooks();

    return books.data;
}

export default booksLoader;