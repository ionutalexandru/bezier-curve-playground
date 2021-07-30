import { ACTIONS } from "../settings";
import CircleIcon from "./icons/Circle";
import CurvedLineIcon from "./icons/CurvedLine";
import LineIcon from "./icons/Line";
import ClickIcon from "./icons/Click";

const ButtonIcon = ({ type }) => {
  if (type === ACTIONS.CLICK) {
    return <ClickIcon />;
  } else if (type === ACTIONS.LINE) {
    return <LineIcon />;
  } else if (type === ACTIONS.CIRCLE) {
    return <CircleIcon />;
  } else {
    return <CurvedLineIcon />;
  }
};

const Button = ({ type, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`${
      isActive ? "bg-gray-500" : "bg-gray-300"
    } h-6 w-6 p-2 text-white rounded mx-2`}
  >
    <ButtonIcon type={type} />
  </button>
);

const TopBar = ({ action, setAction }) => {
  const handleOnClick = (selectedAction) => {
    if (action === selectedAction) {
      setAction(ACTIONS.CLICK);
    } else {
      setAction(selectedAction);
    }
  };
  return (
    <div className="left-1/2 transform -translate-x-1/2 p-2 absolute">
      <div className="min-w-0 p-2 flex flex-col justify-center items-center bg-white rounded-sm shadow">
        <div className="w-100 flex flex-row items-center">
          <h1 className="font-bold text-gray-500">IAC</h1>
          {Object.values(ACTIONS).map((actionType) => (
            <Button
              key={actionType}
              onClick={() => handleOnClick(actionType)}
              isActive={action === actionType}
              type={actionType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
