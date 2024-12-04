import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AddEditTaskModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  Modal.setAppElement("#root");

  const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .optional(),
    status: z.enum(["Pending", "Completed", "Select an option"]).refine(value => value !== "Select an option", {
      message: "Please select a status",
    }),
    assignee: z.string().min(3, "Assignee name must be at least 3 characters long"),
    dueDate: z
      .string()
      .nonempty("Due date is required")
      .refine((value) => new Date(value) > new Date(), {
        message: "Due date must be in the future",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Select an option",
      assignee: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset(initialData); 
      } else {
        reset({
          title: "",
          description: "",
          status: "Select an option",
          assignee: "",
          dueDate: "",
        }); 
      }
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Task" : "Add New Task"}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Task Title"
              {...register("title")}
              className="w-full border-gray-300 p-2 rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="Task Description (Optional)"
              {...register("description")}
              className="w-full border-gray-300 p-2 rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("status")}
              className="w-full border-gray-300 p-2 rounded-md"
            >
              <option value="Select an option">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Assignee"
              {...register("assignee")}
              className="w-full border-gray-300 p-2 rounded-md"
            />
            {errors.assignee && (
              <p className="text-red-500 text-sm">{errors.assignee.message}</p>
            )}
          </div>

          <div>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border-gray-300 p-2 rounded-md"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button type="submit" className="bg-gray-800 text-white">
              {initialData ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={() => {
                reset({
                  title: "",
                  description: "",
                  status: "Select an option",
                  assignee: "",
                  dueDate: "",
                });
                onClose();
              }}
              variant="outline"
              className="border-gray-300 text-gray-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditTaskModal;
