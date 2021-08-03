import { ACTION_TYPES } from "settings";
import CircleIcon from "Icons/Circle";
import CurvedLineIcon from "Icons/CurvedLine";
import LineIcon from "Icons/Line";
import ClickIcon from "Icons/Click";

const ButtonIcon = ({ type }) => {
  if (type === "CLICK") {
    return <ClickIcon />;
  } else if (type === "LINE") {
    return <LineIcon />;
  } else if (type === "CIRCLE") {
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
      setAction(ACTION_TYPES.CLICK);
    } else {
      setAction(selectedAction);
    }
  };
  return (
    <div className="left-1/2 transform -translate-x-1/2 p-2 absolute">
      <div className="min-w-0 p-2 flex flex-col justify-center items-center bg-white rounded-sm shadow">
        <div className="w-100 flex flex-row items-center">
          <h1 className="font-bold text-gray-500">IAC</h1>
          {ACTION_TYPES.map(({ id }) => (
            <Button
              key={id}
              onClick={() => handleOnClick(id)}
              isActive={action === id}
              type={id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
