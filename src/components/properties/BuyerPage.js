//IMPORTS----->
import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../Menu";
import apiService from '../../services/apiService';
import {
  Pagination,
  Card,
  Button,
  Row,
  Col,
  Form,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";
import "../../css/Buyerpage.css";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";


//MAIN FUNCTION----->
function BuyerPage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(500);
  const { image} = useParams();

  const [property, setProperty] = useState({});
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  //HOOKS ------->
  useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get(
  //       "https://jsonplaceholder.typicode.com/photos"
  //     );
  //     setPosts(res.data);
  //   };

  //   fetchPosts();
  // }, []);


  async function getProperties() {
    try {
      const data = await apiService.getProperties(posts);
        const images = await apiService.getImages(
          data.Property.images,
          "imageUrl"
      );
      setImages(images);
      setProperty(data.Property);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
    getProperties();
  },[]);

  const buildImages = () => {
    let imageItems =
      images.length > 0 &&
      images.map((imageUrl) => {
        return (
          <Carousel.Item>
            <img className="d-block w-100" src={imageUrl} alt="First slide" />
            <Carousel.Caption>
              <h3>{property.name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        );
      });

    return imageItems;
  };
  


  //DISPLAYING CURRRENT POSTS----->

  const LastPostIndex = currentPage * postsPerPage;
  const FirstPostIndex = LastPostIndex - postsPerPage;
  const currentPosts = posts.slice(FirstPostIndex, LastPostIndex);

  //PAGINATION CODE------>
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (loading) {
    return <p>...loading</p>;
  } else {

  return (
    <>
      <Menu />
      <Container className="display-flex">
        <h3 className="text-center">All Properties</h3>
        <div>
          <Row>
            <div classname="form">
              <Form>
                <Form.Group className="mb-5 mx-5" controlId="SelectDropdown">
                  <Row className="mt-2 ">
                    <Col md>
                      <Form.Label htmlFor=""></Form.Label>
                      <Form.Select id="Select">
                        <option >Select Flat Type</option>
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="Villa">Villa</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Col>
                    <Col md>
                      <Form.Label htmlFor=""></Form.Label>
                      <Form.Select id="Select">
                        <option>Select City</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </div>
          </Row>
          {/* </Container> */}
        </div>
        <div classname="card">
          {images ? (
            buildImages()
          ):(
          <Row className="g-4">
            {currentPosts.map((post) => (
              <Col md={6} key={post.id}>
                <Card>
                  <Card.Img variant="top" src={post.url} />

                  <Card.ImgOverlay className="img-overlay">
                    <Button className="img-button">Palazo</Button>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
          )}
        </div>
        <Pagination className="page">
          {pageNumbers.map((number) => {
            return (
              <Pagination.Item onClick={() => paginate(number)}>
                {number}
              </Pagination.Item>
            );
          })}
        </Pagination>
      </Container>
      <Footer />
    </>
  );

}
}
export default BuyerPage;
