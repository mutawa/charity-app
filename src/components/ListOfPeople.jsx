import React from "react";
import Person from "./Person";
import axios from "axios";

import { useState } from "react";
import { useEffect } from "react";

import "./ListOfPeople.css";

const ListOfPeople = () => {
  const [people, setPeople] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // todo : check for errors
      const url = `http://localhost/api/people/all/${pageNumber}`;
      //url = "";
      const response = await axios(url);

      setRowCount(response.data.allRowsCount);

      setPeople(response.data.data);
    };

    fetchData();
  }, [pageNumber, rowCount]);

  const deletePerson = (id) => {
    console.log("deleting " + id);
    const deleteOnServer = async () => {
      const url = "http://localhost/api/people/delete";

      const response = await axios.post(url, { id: id });

      const deleted = response.data.data[0];
      const filtered = people.filter((man) => man.id !== deleted.id);
      console.log(rowCount, response.data.currentCount);
      // todo: check for a more efficeint way to get count...
      setRowCount(rowCount - response.data.currentCount);
      //console.log({ deleted, filtered });
      setPeople(filtered);
    };

    deleteOnServer();
  };

  const addNew = () => {
    const man = {
      id: 0,
      first_name: prompt("الإسم الأول"),
      father_name: "abdullah",
      grand_name: "ahmad",
      family_name: prompt("إسم العائلة"),
    };

    const addOnServer = async () => {
      const url = "http://localhost/api/people/add";
      const resp = await axios.post(url, man);
      const added = resp.data.data[0];
      setRowCount(rowCount + resp.data.currentCount);
    };

    addOnServer();
  };

  return (
    <div className="container m-3">
      <button onClick={addNew} type="button" className="btn btn-sm btn-primary">
        <span className="fa fa-plus"></span> جديد
      </button>
      <span>عدد السجلات : {rowCount}</span>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>رقم</th>
            <th>الإسم</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {people.map((p, i) => (
            <Person key={i} person={p} onDelete={deletePerson} />
          ))}
        </tbody>
        <tfoot dir="ltr">
          <tr>
            <td colSpan="3">
              <ul className="pagination">
                {[...Array(Math.ceil(rowCount / 10)).keys()].map((b) => (
                  <li
                    className={`page-item ${
                      pageNumber == b + 1 ? "active" : ""
                    }`}
                    key={b}
                    onClick={() => setPageNumber(b + 1)}
                  >
                    <button type="button" className="page-link">
                      {b + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ListOfPeople;
