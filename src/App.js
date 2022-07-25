import Navi from "./Navi";
import React from "react";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import { Component } from "react";

export default class App extends Component {

  state = { currentCategory: "", products: [] }

  componentDidMount() {
    this.getProducts();
  }
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;

    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));;
  };

  render() {
    let productInfo = { title: "PList props" }
    let categoryInfo = { title: "CList props" }

    return (
      <div>
        <Container>
          {/* <Row> */}
            <Navi />
          {/* </Row> */}
          <Row>
            <Col xs="3">
              <CategoryList currentCategory={this.state.currentCategory} changeCategory={this.changeCategory} info={categoryInfo} />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                currentCategory={this.state.currentCategory} info={productInfo} />
            </Col>
          </Row>
        </Container>
      </div>
    );

  }
}