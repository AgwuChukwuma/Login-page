import { useEffect, useState } from "react";
import Auth from "./Auth.jsx";
import { db, auth } from "./config/firebase-config.js";
import { getDocs , collection, addDoc, deleteDoc, doc} from "firebase/firestore";

function App() {

  const [movieList, setMovieList] = useState([]);

  const[newMovieTitle, setNewMovieTitle] = useState("");
  const[newReleasedDate, setNewReleasedDate] = useState(0);
  const[isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies")

  const deleteMovie = async (id) =>{
    const movieDoc = doc(db, "movies", id)
     await deleteDoc(movieDoc);
  }
  useEffect(() =>{
    const getMovieList = async () =>{

      try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setMovieList(filteredData);
      }catch (err){
        console.error(err)
      }
    };
    getMovieList();
},[]);

const onSubmitMovie = async() =>{
  try{
  await addDoc(
    moviesCollectionRef,{
      title: newMovieTitle,
      releaseDate: newReleasedDate,
      receivedAnOscar: isNewMovieOscar,
      userId: auth?.currentUser?.uid,
    }
  );
  setNewMovieTitle("");
  setNewReleasedDate(0);
  setIsNewMovieOscar(false);
}catch(err){
  console.error(err);
}
};

  return (
      <div>
        <Auth />

        <input placeholder="Movie title..." onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input placeholder="Released date" type="number"  onChange={(e) => setNewReleasedDate(Number(e.target.value))}/>
        <input type="checkbox" onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>Summit Movie</button>

        <div>
          {movieList.map((movie) => (
            <div key={movie.id}>
              <h1 style={{color: movie.receivedAnOscar ? "green" : "red"}}> 
                {movie.title}
                </h1>
              <p> Date: {movie.releaseDate}</p>
              <button onClick = {() => deleteMovie(movie.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
       )
}

export default App
