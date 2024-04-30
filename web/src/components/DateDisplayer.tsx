import React from "react";

interface Props {
  date: Date;
}

const DateDisplayer: React.FC<Props> = ({ date }) => {
  return (
    <span>
      {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
    </span>
  );
};

export default DateDisplayer;
