import reviewServices from "../services/reviewServices";

const reviewsLoader = async ({ params }) => {
    const { id } = params;

    const response = await reviewServices.getReviews(id);

    return response.data;
}

export default reviewsLoader;