import React, { useState } from "react";
import "./EditerCard.scss";
import TextareaAutosize from "react-textarea-autosize";
import { IoReturnDownForwardOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../../store/NoteSlice";

const bgColorsObjArray = [
  { colorCode: "#FBAFA9" },
  { colorCode: "#F29F77" },
  { colorCode: "#FFF8B8" },
  { colorCode: "#E2F6D3" },
  { colorCode: "#B5DCD3" },
  { colorCode: "#D4E4ED" },
  { colorCode: "#AFCCDD" },
  { colorCode: "#D3BEDA" },
];

// Editer common Component............................................

const EditerCard = ({ editMode, currentNote, setEditMode }) => {
  const [NoteDetails, setNoteDetails] = useState({
    id: uuidv4(),
    title: currentNote?.title || "",
    description: currentNote?.description || "",
    bgColor: currentNote?.bgColor || "var(--editerColor)",
  }); // here initial value of the state is empty or the current seleted note's values geting that from props

  const dispatch = useDispatch();

  // console.log(NoteDetails);

  const savingNote = () => {
    // here saving the note and setting the state as empty
    if (NoteDetails.title !== "" || NoteDetails.description !== "") {
      dispatch(add(NoteDetails));
      setNoteDetails({
        ...NoteDetails,
        id: uuidv4(),
        title: "",
        description: "",
      });
    }
  };
  const updateNote = () => {
    // Updating the Note Edit btn function
    dispatch(
      update({
        ...currentNote,
        title: NoteDetails.title,
        description: NoteDetails.description,
        bgColor: NoteDetails.bgColor,
      })
    );
    setEditMode(false); // seting the EditMode False so editer get closed....
  };
  ////////////////////////////
  return (
    <div className="EditerCardWrapper">
      <div
        className="containerForEditer"
        style={{ backgroundColor: `${NoteDetails.bgColor}` }}
      >
        <TextareaAutosize
          value={NoteDetails.title}
          placeholder="Title"
          className="textArea1"
          maxRows={10}
          minRows={1.4}
          onChange={(e) =>
            setNoteDetails({ ...NoteDetails, title: e.target.value })
          }
          // cols={40}
        />
        <TextareaAutosize
          value={NoteDetails.description}
          onChange={(e) =>
            setNoteDetails({ ...NoteDetails, description: e.target.value })
          }
          placeholder="Take a note..."
          className="textArea2"
          maxRows={30}
          minRows={1.4}
          // cols={40}
        />
        <div className="colors">
          <div className="colorContainer">
            <svg
              onClick={() =>
                setNoteDetails({
                  ...NoteDetails,
                  bgColor: "var(--editerColor)",
                })
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              focusable="false"
              className="zTETae-hxXJme-LgbsSe-Bz112c NMm5M"
            >
              <path d="M21.19 21.19l-3.06-3.06-1.43-1.43-8.3-8.3L7 7 2.81 2.81 1.39 4.22l4.25 4.25A8.056 8.056 0 0 0 4.01 13H4c0 4.42 3.58 8 8 8 1.74 0 3.35-.57 4.66-1.51l3.12 3.12 1.41-1.42zM12 19c-3.22 0-5.86-2.55-5.99-5.74l.01-.19c.04-1.14.42-2.25 1.06-3.18l8.16 8.16c-.95.6-2.05.95-3.24.95zm0-14.17l4.25 4.24a6.014 6.014 0 0 1 1.74 4.01l.01.17c-.02.56-.13 1.11-.3 1.62l1.53 1.53c.49-1.03.77-2.18.77-3.4h-.01a7.975 7.975 0 0 0-2.33-5.35L12 2 8.41 5.58 9.83 7 12 4.83z"></path>
            </svg>{" "}
            {/* // this should be in the assets folder */}
            {bgColorsObjArray.map((colors, index) => (
              <div
                key={index}
                className="colorPiker"
                style={{ backgroundColor: `${colors.colorCode}` }}
                onClick={() =>
                  setNoteDetails({ ...NoteDetails, bgColor: colors.colorCode })
                }
              ></div>
            ))}
          </div>

          {editMode ? (
            <button
              className="closeBtn"
              onClick={() => {
                updateNote(); // calling function
              }}
            >
              Edit
            </button>
          ) : (
            <button
              className="closeBtn"
              onClick={() => {
                savingNote(); // calling function
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditerCard;
