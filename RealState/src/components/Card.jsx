import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
export function CardDefault({image, onShowMore}) {
  const navigate= useNavigate()
  const handleShowMoreOpen = () => {
    // onshowMoreInside(image)
      onShowMore(image);
      console.log("in the card");
      navigate('/designs/details')
  };
  return (
    <div className="flex-1 flex items-center justify-center">
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={image.image}
          alt="card-image"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {image.name}
        </Typography>
        <Typography>
          {image.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleShowMoreOpen}>Read More</Button>
      </CardFooter>
    </Card>

    </div>
  );
}