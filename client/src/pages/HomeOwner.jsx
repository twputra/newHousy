import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Navbar from "../components/Navbar";
import magnifiyIc from "../assets/img/magnifiyIc.svg";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

function HomeOwner(props) {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
  });

  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  console.log(transactions);
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "200px" }}>
        <h1>Incoming Transaction</h1>
        <Table className="" striped hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>Type of Rent</th>
              {/* <th>Bukti Transfer</th> */}
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((value, index) => {
              return (
                
                <tr>
                  
                  <td className="py-3">{index+1}</td>
                  <td className="py-3">{value.user.fullname}</td>
                  <td className="py-3">{value.house.type_rent}</td>
                  {/* <td className="py-3">{value.check_in}</td> */}
                  <td className="py-3">{value.status_payment}</td>
                  <td
                    className={
                      value.status_payment === "success"
                        ? "text-success"
                        : value.status_payment === "Pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    {value.status_payment}
                  </td>
                  <td className="py-3">
                    <img src={magnifiyIc} alt="magnify" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default HomeOwner;
