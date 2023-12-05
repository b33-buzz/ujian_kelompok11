import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEdit";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [backgroundColors, setBackgroundColors] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todo"));
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosData);

        // Set initial background colors only once when component mounts
        if (Object.keys(backgroundColors).length === 0) {
          const initialBackgroundColors = {};
          todosData.forEach((todo) => {
            initialBackgroundColors[todo.id] = getRandomColor();
          });
          setBackgroundColors(initialBackgroundColors);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    // Set up a real-time listener
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(updatedTodos);

      // Update background colors
      const updatedBackgroundColors = { ...backgroundColors };
      updatedTodos.forEach((todo) => {
        updatedBackgroundColors[todo.id] =
          backgroundColors[todo.id] || getRandomColor();
      });
      setBackgroundColors(updatedBackgroundColors);
    });

    // Call fetchTodos after setting up the real-time listener
    fetchTodos();

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [backgroundColors]);

  const handleDeleteTodo = async (id) => {
    try {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with deletion
        await deleteDoc(doc(db, "todo", id));
        console.log("Todo deleted successfully");

        // Show success message
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);

      // Show error message
      Swal.fire("Error!", "There was an error deleting your todo.", "error");
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleSaveEditedTodo = async (newTitle) => {
    try {
      if (editingTodo) {
        // Update the todo in Firestore
        await updateDoc(doc(db, "todo", editingTodo.id), { title: newTitle });
      } else {
        // Add a new todo to Firestore
        await addDoc(collection(db, "todo"), {
          title: newTitle,
        });
      }

      // Close the modal
      setEditingTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <ul className="flex flex-col">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="border rounded-md w-[1100px] h-[70px] text-white font-bold flex items-center justify-between p-4 mb-5"
            style={{ backgroundColor: backgroundColors[todo.id] }}
          >
            <span className="text-2xl font-bold">{todo.title}</span>
            <div>
              <button
                onClick={() => handleEditTodo(todo)}
                className="text-white px-4 py-2 rounded mr-2"
              >
                <MdEdit className="hover:text-primary" size={30} />
              </button>
              <button
                className="text-white font-bold px-4 py-2 rounded"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <MdDelete className="hover:text-error" size={30} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ModalEdit
        isOpen={!!editingTodo}
        todo={editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={handleSaveEditedTodo}
      />
    </div>
  );
};

export default ListTodo;
