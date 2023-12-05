import { useEffect, useRef } from "react";

const ModalEdit = ({ isOpen, todo, onClose, onSave }) => {
  const newTaskInputRef = useRef(null);

  useEffect(() => {
    // Focus on the input when the modal opens
    if (isOpen) {
      newTaskInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = () => {
    const newTask = newTaskInputRef.current.value;
    onSave(newTask);
  };

  return (
    <dialog open={isOpen} id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Task</h3>
        <input
          type="text"
          ref={newTaskInputRef}
          defaultValue={todo ? todo.title : ""}
          placeholder="Enter New Task"
          className="input input-bordered w-full"
        />
        <div className="modal-action">
          <button
            className="btn btn-success text-white mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button className="btn btn-error text-white" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalEdit;
