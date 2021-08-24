import React from "react";
import { Card, Col, Table } from "react-bootstrap";

const VariationTable = ({
  hasVariant,
  ProductVariationList,
  setProductVariationList,
  hasColor,
  hasSize,
}) => {
  const TableHead = ["ID", "PRICE", "SIZE", "COLOR", " "];

  const deletevariation = async (id) => {
    let arr;
    arr = ProductVariationList.filter((item, index) => index !== id);
    setProductVariationList(arr);
  };

  return (
    <div>
      {hasVariant.checked ? (
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title>ADDED VARIATIONS</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="col-12 my-5 w-100">
                <Table responsive striped bordered className="verticle-middle">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">PRICE</th>
                      {!hasSize.checked ? "" : <th scope="col">SIZE</th>}
                      {!hasColor.checked ? "" : <th scope="col">COLOR</th>}
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ProductVariationList.length > 0
                      ? ProductVariationList.map((item, index) => (
                          <tr key={index}>
                            <td>{index}</td>

                            <td>{item.price}</td>

                            {!hasSize.checked ? "" : <td>{item.size_value}</td>}

                            {!hasColor.checked ? (
                              ""
                            ) : (
                              <td>{item.color_name}</td>
                            )}

                            <td>
                              <span>
                                <i
                                  className="fa fa-close"
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                  }}
                                  onClick={() => deletevariation(index)}
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        ""
      )}
    </div>
  );
};

export default VariationTable;
