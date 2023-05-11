import React, { useState } from "react";

const EditableProfile = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [password, setPassword] = useState(user?.password || "");
  const [state, setState] = useState(user?.state || "");
  const [country, setCountry] = useState(user?.country || "");
  const [postcode, setPostcode] = useState(user?.postcode || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    setEditing(false);
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setPassword(user?.password || "");
    setState(user?.state || "");
    setCountry(user?.country || "");
    setPostcode(user?.postcode || "");
    setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        {editing ? (
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{firstName}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        {editing ? (
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{lastName}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        {editing ? (
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        {editing ? (
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{phone}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        {editing ? (
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{password}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="state">State</label>
        {editing ? (
          <input
            type="text"
            className="form-control"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{state}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        {editing ? (
          <input
            type="text"
            className="form-control"
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{country}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="postcode">Postcode</label>
        {editing ? (
          <input
            type="text"
            className="form-control"
            id="postcode"
            value={postcode}
            onChange={(event) => setPostcode(event.target.value)}
          />
        ) : (
          <p className="form-control-plaintext">{postcode}</p>
        )}
      </div>

      {editing ? (
        <div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-outline-primary" onClick={() => setEditing(true)}>
          Edit
        </button>
      )}
    </form>
  );
};

export default EditableProfile;