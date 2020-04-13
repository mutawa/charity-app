import React from "react";

const Person = (props) => {
  const { id, name } = props.person;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <button
          onClick={() => props.onDelete(id)}
          type="button"
          className="btn btn-sm btn-danger"
        >
          <span className="far fa-trash-alt"></span> حذف
        </button>
      </td>
    </tr>
  );
};

export default Person;
