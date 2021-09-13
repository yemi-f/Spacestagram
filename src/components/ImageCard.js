import React, { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ImageCard = ({ image, updateLikedImages }) => {
  const [liked, setLiked] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const handleBtnClick = (url) => {
    setLiked(!liked);
    updateLikedImages(url);
  };

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  if (image.media_type !== "image") return null;

  return (
    <Card style={{ maxWidth: "30rem" }} className="mb-3 mx-auto">
      <Card.Img variant="top" src={image.url} />
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <div>
            <span
              onClick={() => handleBtnClick(image.url)}
              style={{ cursor: "pointer" }}
            >
              {liked ? (
                <FaHeart color="#ED4956" size="24px" />
              ) : (
                <FaRegHeart size="24px" />
              )}
            </span>
          </div>
          <div>
            <span>{image.date}</span>
          </div>
        </div>
        <Card.Title className="h6">{image.title}</Card.Title>
        <Row onClick={toggleCollapse} style={{ cursor: "pointer" }}>
          <div className={collapse ? "text-truncate" : ""}>
            {image.explanation}
          </div>
        </Row>
        <Card.Text
          className="text-muted"
          onClick={toggleCollapse}
          style={{ cursor: "pointer" }}
        >
          {collapse ? "more" : "less"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
