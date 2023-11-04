import React, { Dispatch, SetStateAction } from "react";
import "./createTaskButton.scss";
import { PlusSvg } from "../../../../assets/svg/svg.jsx";

type CreateTaskButtonProps = {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
  modal,
  setModal,
}) => {
  return (
    <button>
      <PlusSvg />
    </button>
  );
};

export default CreateTaskButton;
