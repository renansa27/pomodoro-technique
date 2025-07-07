import { CirclePlay } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "../../templates/contexts/TaskContext/context";
import { CommonButton } from "../CommonButton";
import { CommonInput } from "../CommonInput";
import { Cycles } from "../Cycles";
import { FocusTimeLabel } from "../FocusTimeLabel";

export default function MainForm() {
  const { setState } = useContext(TaskContext);

  function handleClick() {
    setState((prevState) => {
      return {
        ...prevState,
        formattedSecondsRemaining: "21:00",
      };
    });
  }

  return (
    <form className="form" action="">
      <div className="formRow">
        <CommonInput
          id="task"
          label="task"
          type="text"
          placeholder="Digite o título da task"
        />
      </div>
      <FocusTimeLabel time={25} />
      <Cycles />
      <CommonButton icon={<CirclePlay />} type="submit" onClick={handleClick} />
      {/* <CommonButton icon={<StopCircle />} color="red" type="submit" /> */}
    </form>
  );
}
