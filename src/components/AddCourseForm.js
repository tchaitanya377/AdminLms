import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBvx3jCOQp9yvt1G3XWskuBrYzmJdPQCuE",
  authDomain: "lmsp-375f2.firebaseapp.com",
  projectId: "lmsp-375f2",
  storageBucket: "lmsp-375f2.appspot.com",
  messagingSenderId: "749784024909",
  appId: "1:749784024909:web:75fe6504651d0591ce1904",
  measurementId: "G-VSXBY5NPNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [subCourses, setSubCourses] = useState([{ name: '', description: '', topics: [{ name: '', videoUrl: '' }] }]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleVideoUpload = async (event, subCourseIndex, topicIndex) => {
    try {
      const uploadedVideo = event.target.files[0];
      const storageRef = ref(storage, `videos/${uploadedVideo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, uploadedVideo);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress
        },
        (error) => {
          console.error('Error uploading video:', error);
          setAlertMessage('Error uploading video. Please try again.');
          setShowAlert(true);
        },
        () => {
          // Upload completed successfully
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setSubCourses(prevSubCourses => {
              const updatedSubCourses = [...prevSubCourses];
              updatedSubCourses[subCourseIndex].topics[topicIndex].videoUrl = downloadURL;
              return updatedSubCourses;
            });
          });
        }
      );
    } catch (error) {
      console.error('Error uploading video:', error);
      setAlertMessage('Error uploading video. Please try again.');
      setShowAlert(true);
    }
  };

  const handleAddSubCourse = () => {
    setSubCourses([...subCourses, { name: '', description: '', topics: [{ name: '', videoUrl: '' }] }]);
  };

  const handleAddTopic = (subCourseIndex) => {
    setSubCourses(prevSubCourses => {
      const updatedSubCourses = [...prevSubCourses];
      updatedSubCourses[subCourseIndex].topics.push({ name: '', videoUrl: '' });
      return updatedSubCourses;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const courseData = {
        courseName,
        description,
        subCourses
      };

      await addDoc(collection(db, 'courses'), courseData);

      setAlertMessage('Course added successfully');
      setShowAlert(true);

      // Reset form fields after submission
      setCourseName('');
      setDescription('');
      setSubCourses([{ name: '', description: '', topics: [{ name: '', videoUrl: '' }] }]);
    } catch (error) {
      setAlertMessage('Error adding course. Please try again.');
      setShowAlert(true);
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="courseName" className="block font-semibold mb-1">Course Name</label>
          <input
            type="text"
            id="courseName"
            className="w-full border border-gray-300 rounded p-2"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Sub Courses</h2>
          {subCourses.map((subCourse, subCourseIndex) => (
            <div key={subCourseIndex} className="mb-4">
              <input
                type="text"
                placeholder={`Sub Course ${subCourseIndex + 1} Name`}
                className="w-full border border-gray-300 rounded p-2 mb-1"
                value={subCourse.name}
                onChange={(e) => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[subCourseIndex].name = e.target.value;
                  setSubCourses(updatedSubCourses);
                }}
                required
              />
              <textarea
                placeholder={`Sub Course ${subCourseIndex + 1} Description`}
                className="w-full border border-gray-300 rounded p-2 mb-1"
                value={subCourse.description}
                onChange={(e) => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[subCourseIndex].description = e.target.value;
                  setSubCourses(updatedSubCourses);
                }}
                required
              />
              <div className="mb-2">
                <h3 className="text-lg font-semibold mb-1">Topics</h3>
                {subCourse.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="mb-1">
                    <input
                      type="text"
                      placeholder={`Topic ${topicIndex + 1} Name`}
                      className="w-full border border-gray-300 rounded p-2 mb-1"
                      value={topic.name}
                      onChange={(e) => {
                        const updatedSubCourses = [...subCourses];
                        updatedSubCourses[subCourseIndex].topics[topicIndex].name = e.target.value;
                        setSubCourses(updatedSubCourses);
                      }}
                      required
                    />
                    <input
                      type="file"
                      accept="video/*"
                      className="mb-2"
                      onChange={(e) => handleVideoUpload(e, subCourseIndex, topicIndex)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddTopic(subCourseIndex)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Topic</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddSubCourse} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Sub Course</button>
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit Course</button>
      </form>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <button onClick={() => setShowAlert(false)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
