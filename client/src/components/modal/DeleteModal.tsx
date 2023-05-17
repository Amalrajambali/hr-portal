import React from "react";

function DeleteModal({ modalActive, deleteUserHandler, setModalActive }: any) {
  return (
    <div>
      <div className={modalActive ? "is-active modal" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Are You Sure You Want To Delete...?</p>
            <button className="delete" aria-label="close" onClick={() => setModalActive(false)}></button>
          </header>
          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={deleteUserHandler}>
              Delete
            </button>
            <button className="button" onClick={() => setModalActive(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
