import React, { useState } from "react";
import "./NoteCard.scss";
import EditerCard from "../editerCard/EditerCard";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../store/NoteSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const NoteCard = ({ listOrGridView, searchInput, theme }) => {
  const noteList = useSelector((state) => state.noteList); // getting all notes from redux-store
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState({});// setting current note 

  return (
    <>
      <div
        className={`${listOrGridView ? "noteWraperGrid" : "noteWraperList"}`}
        style={{ backgroundColor: `${theme ? "var(--editerColor)" : "var(--blackGray)"}`, position: `${editMode ? "fixed" : "relative"}` }}
      >
        <EditerCard />

        <>
          {searchInput.isSearching && // if user is searching then search algo run
            noteList.map((i) => {
              if (
                i.title
                  .trim()
                  .toLowerCase()
                  .includes(searchInput.searchValue.trim().toLowerCase()) ||
                i.description
                  .trim()
                  .toLowerCase()
                  .includes(searchInput.searchValue.trim().toLowerCase())
              ) {
                return (
                  <div
                    key={i.id}
                    style={{ backgroundColor: `${i.bgColor}` }}
                    className="noteContainer"
                    onClick={() => {
                      setEditMode(!editMode);
                      setCurrentNote({ ...i }); // user's selected current note
                    }}
                  >
                    <p className="title">{i.title}</p>
                    <p className="description">{i.description}</p>
                  </div>
                );
              }
            })}

          {!searchInput.isSearching && // if user is not searching then show all notes in reverse
            noteList.slice(0).reverse().map((i) => (
              <div
                key={i.id}
                style={{ backgroundColor: `${i.bgColor}` }}
                className="noteContainer"
                onClick={() => {
                  setEditMode(!editMode);
                  setCurrentNote({ ...i });
                }}
              >
                <p className="title">{i.title}</p>
                <p className="description">{i.description}</p>
              </div>
            ))}
        </>
        {editMode && (
          <div className="editModeOn">
            <EditerCard
              editMode={editMode}
              currentNote={currentNote}
              setEditMode={setEditMode}
            />
            <div className="Btn">
              <button
                onClick={() => {
                  // dispatch(remove(currentNote.id));
                  // setEditMode(false);
                  confirmAlert({ /// warning for delete
                    title: "Warning",
                    message: "Are you sure you want to delete this",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () => {
                          dispatch(remove(currentNote.id));
                          setEditMode(false);
                        },
                      },
                      {
                        label: "No",
                        onClick: () => {
                          setEditMode(false);
                        },
                      },
                    ],
                  });
                }}
              >
                Delete Note
              </button>
              <button onClick={() => setEditMode(false)}>Close Editer</button> 
              {/* deleteing the note with warning */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NoteCard;
