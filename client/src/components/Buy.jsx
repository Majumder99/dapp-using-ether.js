import { ethers } from "ethers";
import React, { useState } from "react";

const Buy = ({ state }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { contract } = state;
  const buyChai = async (e) => {
    e.preventDefault();
    console.log({ contract });
    const amount = { value: ethers.utils.parseEther("0.0000001") };
    const transaction = await contract.buyChai(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <>
      <div className="container-md" style={{ width: "50%", marginTop: "25px" }}>
        <form onSubmit={buyChai}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!state.contract}
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
