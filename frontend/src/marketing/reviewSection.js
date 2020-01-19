import React, { useState, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

function ReviewText({ text }) {
  const [viewMore, setViewMore] = useState(false);
  const DEFAULT_LENGTH = 120;
  if (text.length < DEFAULT_LENGTH) {
    return text;
  } else if (viewMore) {
    return (
      <Fragment>
        {text}
        <br />
        <Button color={"link"} onClick={() => setViewMore(false)}>
          View Less
        </Button>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {text.slice(0, DEFAULT_LENGTH)}
        <br />
        <Button color={"link"} onClick={() => setViewMore(true)}>
          View More
        </Button>
      </Fragment>
    );
  }
}

function ReviewCard({ reviewerName, text, imgSrc, altText }) {
  return (
    <Card>
      <CardBody className={"text-center"}>
        <img src={imgSrc} alt={altText} className={"rounded-circle"} />
        <CardTitle tag={"h2"}>{reviewerName}</CardTitle>
        <CardText>
          <ReviewText text={text} />
        </CardText>
      </CardBody>
    </Card>
  );
}

export default function ReviewSection(props) {
  const reviews = [
    {
      imgSrc: "http://placekitten.com/g/100/100",
      imgAltText: "altText",
      reviewerName: "Helpful Turtle",
      text:
        "Doggo ipsum pupperino floofs ur givin me a spook heckin good boys and girls, adorable doggo. very good spot dat tungg tho fat boi. Borking doggo smol borking doggo with a long snoot for pats wrinkler very taste wow very good spot wow very biscit very jealous pupper heck, aqua doggo porgo doggorino waggy wags noodle horse many pats. big ol pupper doge. Boof adorable doggo most angery pupper I have ever seen super chub I am bekom fat big ol pupper aqua doggo tungg floofs, sub woofer blop aqua doggo smol borking doggo with a long snoot for pats long woofer h*ck stop it fren. Porgo heck super chub clouds shooberino very hand that feed shibe, vvv borkdrive pupper maximum borkdrive. You are doing me a frighten snoot puggo aqua doggo pupper, boof most angery pupper I have ever seen heckin angery woofer, stop it fren pats heckin. Aqua doggo shooberino very hand that feed shibe you are doin me a concern, floofs tungg yapper wow such tempt, you are doing me a frighten heckin good boys and girls. Doggorino fluffer aqua doggo very hand that feed shibe such treat wrinkler, the neighborhood pupper smol borking doggo with a long snoot for pats smol h*ck."
    },
    {
      imgSrc: "http://placekitten.com/g/100/100",
      imgAltText: "altText",
      reviewerName: "Silly Snake",
      text:
        "Doggo ipsum pupperino floofs ur givin me a spook heckin good boys and girls, adorable doggo. very good spot dat tungg tho fat boi. Borking doggo smol borking doggo with a long snoot for pats wrinkler very taste wow very good spot wow very biscit very jealous pupper heck, aqua doggo porgo doggorino waggy wags noodle horse many pats. big ol pupper doge. Boof adorable doggo most angery pupper I have ever seen super chub I am bekom fat big ol pupper aqua doggo tungg floofs, sub woofer blop aqua doggo smol borking doggo with a long snoot for pats long woofer h*ck stop it fren. Porgo heck super chub clouds shooberino very hand that feed shibe, vvv borkdrive pupper maximum borkdrive. You are doing me a frighten snoot puggo aqua doggo pupper, boof most angery pupper I have ever seen heckin angery woofer, stop it fren pats heckin. Aqua doggo shooberino very hand that feed shibe you are doin me a concern, floofs tungg yapper wow such tempt, you are doing me a frighten heckin good boys and girls. Doggorino fluffer aqua doggo very hand that feed shibe such treat wrinkler, the neighborhood pupper smol borking doggo with a long snoot for pats smol h*ck."
    },
    {
      imgSrc: "http://placekitten.com/g/100/100",
      imgAltText: "altText",
      reviewerName: "Great Doggo",
      text:
        "Doggo ipsum pupperino floofs ur givin me a spook heckin good boys and girls, adorable doggo. very good spot dat tungg tho fat boi. Borking doggo smol borking doggo with a long snoot for pats wrinkler very taste wow very good spot wow very biscit very jealous pupper heck, aqua doggo porgo doggorino waggy wags noodle horse many pats. big ol pupper doge. Boof adorable doggo most angery pupper I have ever seen super chub I am bekom fat big ol pupper aqua doggo tungg floofs, sub woofer blop aqua doggo smol borking doggo with a long snoot for pats long woofer h*ck stop it fren. Porgo heck super chub clouds shooberino very hand that feed shibe, vvv borkdrive pupper maximum borkdrive. You are doing me a frighten snoot puggo aqua doggo pupper, boof most angery pupper I have ever seen heckin angery woofer, stop it fren pats heckin. Aqua doggo shooberino very hand that feed shibe you are doin me a concern, floofs tungg yapper wow such tempt, you are doing me a frighten heckin good boys and girls. Doggorino fluffer aqua doggo very hand that feed shibe such treat wrinkler, the neighborhood pupper smol borking doggo with a long snoot for pats smol h*ck."
    }
  ];
  return (
    <div>
      <Row>
        <Col className={"text-center"}>
          <h1> Our Reviews </h1>
        </Col>
      </Row>
      <Row>
        {reviews.map((review, idx) => {
          return (
            <Col xs={"6"} lg={"4"} key={idx}>
              <ReviewCard {...review} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
