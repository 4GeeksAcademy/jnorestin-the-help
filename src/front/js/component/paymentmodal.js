import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PayPal from '../component/paypal';

const Paymentmodal = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Make Payment
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Payment Options</h5>
              
            </div>
            <div className="modal-body">
            <PayPal />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Paymentmodal