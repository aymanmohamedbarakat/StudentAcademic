import React from "react";
import { handleModalSubmit } from "./utils/modalHandlers";
import RemoveModal from "./components/RemoveModal";
import FormModal from "./components/FormModal";
import { useStudentStore } from "../../stores/studentStore";
import { useModalStore } from "../../stores/modalStore";

export default function UniversalModal() {
  const { isOpen, mode, entityType, data, context, closeModal } =
    useModalStore();
  const studentStore = useStudentStore();

  if (!isOpen || !entityType || !mode) return null;
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("✅ handleSubmit triggered", { values, context });
    try {
      await handleModalSubmit({
        mode,
        entityType,
        data,
        values,
        context,
        studentStore,
        closeModal,
        setSubmitting,
      });
    } catch (error) {
      console.error("Error submitting modal:", error);
      setSubmitting(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {mode === "remove" ? (
        <RemoveModal
          entityType={entityType}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      ) : (
        <FormModal
          mode={mode}
          entityType={entityType}
          data={data}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
