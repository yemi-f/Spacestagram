import React, { useState } from "react";
import { Card, Row, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const ImageCard = ({ image }) => {
  const [liked, setLiked] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const handleBtnClick = () => {
    setLiked(!liked);
  };

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  const removeFocusOnClick = (event) => {
    event.preventDefault();
  };

  if (image.media_type !== "image") return null;

  return (
    <Card style={{ maxWidth: "30rem" }} className="mb-3 mx-auto">
      <Card.Img variant="top" src={image.url} aria-labelledby={image.url} />
      <Card.Body>
        <div className="d-flex justify-content-between mb-2">
          <AnimatedLikeButton
            liked={liked}
            handleBtnClick={handleBtnClick}
            removeFocusOnClick={removeFocusOnClick}
          />
          <div>
            <span>{image.date}</span>
          </div>
        </div>
        <Card.Title className="h6">{image.title}</Card.Title>
        <Row>
          <div className={collapse ? "text-truncate" : ""} id={image.url}>
            {image.explanation}
          </div>
        </Row>
        <Button
          onMouseDown={removeFocusOnClick}
          variant="link"
          className="ps-0 py-0 border-0 text-decoration-none text-muted"
          onClick={toggleCollapse}
        >
          {collapse ? "more" : "less"}
        </Button>
      </Card.Body>
    </Card>
  );
};
const AnimatedLikeButton = ({ liked, handleBtnClick, removeFocusOnClick }) => {
  const spring = useSpring({ x: liked ? 1 : 0 });

  return (
    <animated.div
      onClick={handleBtnClick}
      style={{
        transform: spring.x
          .to({
            range: [0, 0.5, 1],
            output: [1, 1.25, 1],
          })
          .to((x) => `scale(${x})`),
      }}
      children={
        liked ? (
          <Button
            onMouseDown={removeFocusOnClick}
            variant="link"
            className="ps-0 py-0 border-0"
          >
            <FaHeart
              color="#ED4956"
              size="24px"
              aria-label="Unlike"
              role="img"
            />
          </Button>
        ) : (
          <Button
            onMouseDown={removeFocusOnClick}
            variant="link"
            className="ps-0 py-0 border-0 text-reset"
          >
            <FaRegHeart size="24px" aria-label="Like" role="img" />
          </Button>
        )
      }
    />
  );
};

export default ImageCard;
