import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskListing from "./TaskListing";
import AddEditTaskModal from "../components/AddAndEditModal";
import { createTask, deleteTask, editTask, getAllTasks } from "../api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const userData = useSelector((data) => data.user.userData);
  const [status,setStatus] = useState('')
  const [assignee,setAssigne] = useState('')
  const [date,setDate] = useState({startDate:'',endDate:''})

  useEffect(() => {
    fetch();
  }, [status,assignee,date]);

  const fetch = async () => {
    try {
      if (userData._id) {
        const response = await getAllTasks(status,assignee,date);
        setTasks(response.data.data);
      }
      console.log(tasks);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const response = await deleteTask(taskId);
        console.log(response);
        
        if (response.data.message === "Task deleted Successfully") {
          console.log(taskId,"taskId",tasks);
          setTasks((tasks) => tasks.filter((task) => task._id != taskId));
          Swal.fire("Deleted!", response.data.message, "success");
        }
      } else {
        Swal.fire("Cancelled", "Your task is safe :)", "info");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    try {
      const response = await createTask(data);
      if (response.data.message == "Task created successfully") {
        setTasks((tasks) => [...tasks, response.data.data]);
        toast.success(response.data.message);
        onClose();
      }
    } catch (error) {
      console.log(error);

      // toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    try {
      const response = await editTask(editingTask);
      if (response.data.message == "Task updated successfully") {
        setEditingTask(null);
        setTasks((tasks) =>
          tasks.map((task) =>
            task._id === editingTask._id
              ? { ...task, ...response.data.data }
              : task
          )
        );
        toast.success(response.data.message);
      }
    } catch (error) {
      setEditingTask(null);
      toast.error(error.response.data.message);
    }
  };

  const handleModalSubmit = (data) => {
    if (editingTask) {
      onEdit(data);
    } else {
      onSubmit(data);
    }
    setModalOpen(false);
  };

  const onFilter = (filter,value)=>{
    if(filter == "status"){
      setStatus(value)
    }else if(filter == "assignee"){
      setAssigne(value)
    }else if (filter === "startDate") {
      setDate((prevState) => ({
        ...prevState,
        startDate: value,
      }));
    } else if (filter === "endDate") {
      setDate((prevState) => ({
        ...prevState,
        endDate: value, 
      }));
    }
  }

  return (
    <div>
      <Navbar />

      <div className="flex p-2">   
      <Sidebar onFilter={onFilter} />     
        {/* Task Listing with Edit Functionality */}
        <TaskListing
        addTask={handleAddTask}
          onEdit={handleEditTask}
          tasks={tasks}
          onDelete={onDelete}
        />
      </div>

      {/* Add/Edit Task Modal */}
      <AddEditTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTask} // Pass task data for editing
      />
    </div>
  );
};

export default Home;
