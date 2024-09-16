import React, { useState, useEffect } from "react";
import Button from "./Button";
import { MdTaskAlt } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { utils } from "../../utils";

interface TableRowProps {
  data: Record<string, any>; // Dynamiczny obiekt danych
  showId?: boolean; // Prop do kontrolowania widoczności ID
  currentUserId: string; // ID aktualnie zalogowanego użytkownika
}

const TableRow: React.FC<TableRowProps> = ({
  data,
  showId = false,
  currentUserId,
  showTextarea,
  showAction,
  className,
}) => {
  const [note, setNote] = useState<string>("");

  // Ładowanie notatki z localStorage przy montowaniu komponentu
  useEffect(() => {
    if (currentUserId) {
      const storedNote = localStorage.getItem(
        `note-${currentUserId}-${data.id}`
      );
      if (storedNote) {
        setNote(storedNote);
      }
    }
  }, [currentUserId, data.id]);

  // Funkcja do obsługi zmiany wartości w textarea
  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  // Funkcja do zapisywania notatki do localStorage
  const saveNoteToLocalStorage = () => {
    if (currentUserId) {
      localStorage.setItem(`note-${currentUserId}-${data.id}`, note);
      alert("Note saved!");
    }
  };

  return (
    <tr className="  hover:bg-blue-200/10  border-b-blue-100 ">
      {showId && <td className="py-2 hidden lg:flex">{data._id}</td>}

      {Object.keys(data).map((key) => {
        if (key !== "_id") {
          return (
            <td className="" key={key}>
              {key === "isVerified" ? (
                data[key] ? (
                  <MdTaskAlt className="text-green-500 w-[16px] h-auto" />
                ) : (
                  <MdQuestionMark className="text-gray-500/80 w-[16px] h-auto" />
                )
              ) : key === "tags" ? (
                <div className=" hidden lg:flex flex-wrap gap-x-1 gap-y-2 lg:max-w-[400px] ">
                  {(data[key] as string[]).map((tag) => (
                    <span
                      key={tag?._id}
                      className="bg-tag-light text-white px-[8.5px] py-[5px] rounded-lg text-xs "
                    >
                      {tag?.shortname}
                    </span>
                  ))}
                </div>
              ) : key === "updatedAt" ? (
                <div className="hidden lg:flex flex-wrap gap-x-1 gap-y-2 lg:max-w-[400px]  ">
                  {" "}
                  {utils.dateFormatter(data[key])}
                </div>
              ) : (
                <span className="font-semibold text-gray-600 text-[13px]">
                  {data[key]}
                </span>
              )}
            </td>
          );
        }
        return null;
      })}
      {showTextarea && (
        <td className="py-2.5 flex flex-col">
          <textarea
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
            className="border rounded p-1 w-full h-20 resize-none mb-2"
            placeholder="Add a note..."
          />
          <button
            onClick={saveNoteToLocalStorage}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Save Note
          </button>
        </td>
      )}
      {showAction && (
        <td>
          <NavLink
            to={`/articles/${data?._id}`}
            className="flex"
          >
            <IoOpenOutline className="w-5 h-5 text-blue-600/70 " />
          </NavLink>
        </td>
      )}
    </tr>
  );
};

export default TableRow;
