import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCard from "./ImageCard";
import { Container, Spinner } from "react-bootstrap";

const ImagesGrid = () => {
  const [dataLength, setDataLength] = useState(10);
  const [likedImages, setLikedImages] = useState([]);

  const fetchPhotos = async ({ pageParam = 1 }) => {
    const count = 10;

    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const results = await response.json();

    setDataLength(count * pageParam);

    return { results, nextPage: pageParam + 1 };
  };

  const updateLikedImages = (id) => {
    setLikedImages([...likedImages, id]);
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    "photos",
    fetchPhotos,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );

  return (
    <Container>
      {status === "loading" ? (
        <LoadingSpinner />
      ) : status === "error" ? (
        <span className="text-center">Error: {error.message}</span>
      ) : (
        <InfiniteScroll
          dataLength={dataLength}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<LoadingSpinner />}
          style={{ overflow: "hidden" }}
          endMessage={<span className="text-center">That's a wrap!</span>}
        >
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.results.map((image) => (
                <ImageCard
                  key={image.url}
                  image={image}
                  updateLikedImages={updateLikedImages}
                />
              ))}
            </React.Fragment>
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default ImagesGrid;
