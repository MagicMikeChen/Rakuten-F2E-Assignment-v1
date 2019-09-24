import React, { useState, useEffect } from "react";
import uuid from "uuid";

const ItemApp = props => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false); //check edit state
  const [id, setId] = useState(0); //edit item

  const addItem = e => {
    e.preventDefault();
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    //validate ok or not
    if (email.search(emailRule) != -1) {
      console.log("true");
    } else {
      props.handleAlert({ type: "danger", text: "Please enter valied email" });
    }
    if (phone.match(/-?[0-9][0-9,\-]+$/)) {
      //phone validation
      if (edit) {
        let tempItems = items.map(item => {
          return item.id === id ? { ...item, name, phone, email } : item;
        });
        setItems(tempItems);
        setEdit(false);
        props.handleAlert({ type: "success", text: "successful edited" });
        setName(""); //clear each input after submit
        setPhone("");
        setEmail("");
      } else if (
        items.every(
          person =>
            person.name.toLowerCase().trim() !== name.toLowerCase().trim()
        )
      ) {
        const singleitem = { id: uuid(), name, phone, email };
        setItems([...items, singleitem]);
        props.handleAlert({ type: "success", text: "successful added" });
        setName(""); //clear each input after submit
        setPhone("");
        setEmail("");
      } else {
        props.handleAlert({
          type: "danger",
          text: "Name already exist"
        });
      }
    } else {
      //handle error alert
      props.handleAlert({
        type: "danger",
        text: "Phone number must be numbers and +/-"
      });
    }

    // if (
    //   items.every(
    //     person => person.name.toLowerCase().trim() !== name.toLowerCase().trim()
    //   )
    // ) {
    //   const singleitem = { id: uuid(), name, phone, email };
    //   setItems([...items, singleitem]);
    //   props.handleAlert({ type: "success", text: "successful added" });
    //   setName(""); //clear each input after submit
    //   setPhone("");
    //   setEmail("");
    // } else if (name == "") {
    //   props.handleAlert({ type: "danger", text: "Must type a name" });
    // } else {
    //   //handle error alert
    //   props.handleAlert({ type: "danger", text: "Name already exist" });
    // }
  };
  // const handleAlert = ({ type, text }) => {
  //   setAlert({ show: true, type, text });
  //   setTimeout(() => {
  //     setAlert({ show: false });
  //   }, 5000);
  // };

  // const onPhoneChange = e => {
  //   let phone = e.target.value;
  //   if (phone.match(/-?[0-9][0-9,\-]+$/)) {
  //     setPhone(phone);
  //   }
  // };

  const editItem = id => {
    let editing = items.find(item => item.id === id);
    let { name, phone, email } = editing;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setEdit(true);
    setId(id);
  };

  const removeItem = id => {
    setItems(items.filter(item => item.id !== id));
    props.handleAlert({ type: "danger", text: "Item deleted" });
  };

  useEffect(() => {
    const itemsData = JSON.parse(localStorage.getItem("items"));

    if (itemsData) {
      setItems(itemsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <small>* = required field</small>
      <form className="form" onSubmit={addItem}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone Numeber"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            validations={[email]}
          />
        </div>
        <button className="btn btn-primary my-1">
          {edit ? "Edit" : "Add"}
        </button>
      </form>

      <table className="table my-1">
        <thead className="text-center">
          <tr>
            <th>No.</th>
            <th className="">Name</th>
            <th className="">Phone</th>
            <th className="">Email</th>
            <th className="">Edit</th>
            <th className="">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="">{item.name}</td>
              <td className="">{item.phone}</td>
              <td className="">{item.email}</td>
              <td className="btn btn-emoji">
                <button className="btn" onClick={() => editItem(item.id)}>
                  <span role="img" aria-label="edit button">
                    ✏️
                  </span>
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  aria-label="delete button"
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemApp;
