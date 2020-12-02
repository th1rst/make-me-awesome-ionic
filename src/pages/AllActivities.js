import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { FaTrash } from "react-icons/fa";
import ServerResponseToast from "../components/ServerResponseToast";
import { IonBadge, IonContent, IonLoading, IonPage } from "@ionic/react";
import Navbar from "../components/Navigation/Navbar";
import { withFirebase } from "../components/Firebase/context";

function AllActivities(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [firestoreActivities, setFirestoreActivities] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);

  const columns = [
    {
      name: "ID",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <>
              <p>{value}</p>
              <button
                type="button"
                onClick={() => {
                  deleteActivity(value).then(() => {
                    const newData = firestoreActivities.filter((entry) =>
                      entry.id !== value ? value : null
                    );
                    setFirestoreActivities(newData);
                    formatData(newData);
                  });
                }}
              >
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaTrash fill={"red"} />
                  <p> delete</p>
                </span>
              </button>
            </>
          );
        },
      },
    },
    {
      name: "Activity Name",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return <p>{value}</p>;
        },
      },
    },
    "Date",
    {
      name: "Duration (min.)",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return <p>{value}</p>;
        },
      },
    },
    {
      name: "Productiveness",
      options: {
        filter: false,
        customBodyRender: (value) => {
          switch (value) {
            case "Productive":
              return (
                <IonBadge color="success">
                  <p>{value}</p>
                </IonBadge>
              );
            case "Neutral / Necessary":
              return (
                <IonBadge color="warning">
                  <p>Neutral</p>
                </IonBadge>
              );
            case "Unproductive":
              return (
                <IonBadge color="danger">
                  <p>{value}</p>
                </IonBadge>
              );
            default:
              break;
          }
        },
      },
    },
    "Category",
    {
      name: "Notes",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return <p>{value}</p>;
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    filterType: "checkbox",
    rowsPerPage: 15,
    rowsPerPageOptions: [15, 30, 100],
    customHeadRender: (value) => {
      return <h1>{value}</h1>;
    },
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .get()
      .then((querySnapshot) => {
        const activityData = [];

        querySnapshot.forEach((doc) => {
          activityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            notes: doc.data().notes,
          });
        });
        return activityData;
      });
    setFirestoreActivities(response);
    formatData(response);
  };

  const formatData = async (data) => {
    const formattedData = [];
    /* 
                     format: [ ["ID", "Activity Name", "Date", "Duration", "Productiveness", "Category", "Notes",], [ ... ], [ ... ], ]
      example formattedData: [ ["1NKf8xy4k9dIU0bs5eKf", "Watching TV", "10/5/2020", "135", "Unproductive", "Leisure Time", "Was it too much?"], [ ... ], [ ... ], ]
    */
    data
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by newest to oldest
      .map((activity) => formattedData.push(Object.values(activity)));
    setData(formattedData);
    setLoading(false);
  };

  const deleteActivity = async (activityID) => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .doc(`${activityID}`)
      .delete()
      .then(() => {
        setSuccessMessage("Activity successfully deleted.");
        setShowServerResponseToast(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
  };

  return (
    <IonPage>
      <>
        {loading ? (
          <IonLoading />
        ) : (
          <>
            <Navbar />
            <IonContent fullscreen>
              <MUIDataTable
                title={"All Activities Overview"}
                data={data}
                columns={columns}
                options={options}
              />
              {/* ------------- SERVER RESPONSE MODAL ------------- */}
              {showServerResponseToast ? (
                <ServerResponseToast
                  errorMessage={errorMessage}
                  successMessage={successMessage}
                />
              ) : null}
            </IonContent>
          </>
        )}
      </>
    </IonPage>
  );
}

export default withFirebase(AllActivities);
