import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
 
export function CardDefault({file, onShowMore}) {
  const navigate= useNavigate()
  const handleShowMoreOpen = () => {
    // onshowMoreInside(image)
      onShowMore(file);
      console.log("in the card");
      navigate('/designs/details')
  };
  if (file.file.public_id) {
    console.log("Design is defined");
  } else {
    console.error("Invalid book is not defined structure:", book);
  }

  if (
    !file.file ||
    typeof file.file !== "object" ||
    !file.file.public_id
  ) {
    console.error("Invalid gallery file structure:", file.file);
    return null;
  }
    // Extracting the secure_url from gallery.file
    const secureurl = file.file.secure_url;
  return (
    <div className="flex-1 text-md lg:text-lg  flex items-center justify-center">
    <Card className="mt-6 bg-gray-200 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={secureurl}
          alt="card-image"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {file.name}
        </Typography>
        <Typography>
          {file.desc.slice(0, 30)}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleShowMoreOpen} 
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-light-blue-200  hover:shadow-light-blue-400 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-2/5 bg-light-blue-100  text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">Read More</Button>
      </CardFooter>
    </Card>

    </div>
  );
}