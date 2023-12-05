import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Button from "./Button";
import Swal from "sweetalert2";

const AddTodo = () => {
  const [task, setTask] = useState("");

  const handleAddTodo = async () => {
    try {
      if (task.trim() === "") {
        Swal.fire({
          title: "Error!",
          text: "Task Cannot Be Empty",
          icon: "error",
        });
        return;
      }

      // Add a new todo to Firestore
      const docRef = await addDoc(collection(db, "todo"), {
        title: task,
        timestamp: serverTimestamp(),
      });

      console.log("Todo added with ID:", docRef.id);

      // Clear the input field after adding the todo
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="What's the task"
        className="input input-bordered w-[800px]"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button onClick={handleAddTodo} />
    </>
  );
};

export default AddTodo;
