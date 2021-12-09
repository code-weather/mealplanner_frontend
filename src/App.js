// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom";

//////////////////
// Style Object
//////////////////
const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

  /////////////////////////////
  // State and Other Variables
  /////////////////////////////

  const navigate = useNavigate()

  const url = "https://mealplanner-backend.herokuapp.com/meals/"

  // State to hold list of meals
  const [posts, setPosts] = useState([])

  // an empty meal for initializing the create form
  const nullMeal = {
    days: "",
    subject: ""
  }

  const [targetMeal, setTargetMeal] = useState(nullMeal)

   //////////////
  // Functions
  //////////////

  // function to get list of meals from API
  const getMeals = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // function to add meals
  const addMeals = async (newMeal) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMeal)
    });

    // update the list of meals
    getMeals()
  }

  // to select a meal to edit
  const getTargetMeal = (meal) => {
    setTargetMeal(meal);
    navigate("/edit");
  };

  // update meal for our handlesubmit prop
  const updateMeal = async (meal) => {
    await fetch(url + meal.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });

    // update our meals
    getMeals();
  };

  const deleteMeal = async (meal) => {
    await fetch(url + meal.id, {
      method: "delete"
    })

    getMeals()
    navigate("/")
  }

  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getMeals()
  }, [])

  /////////////////
  // Returned JSX
  /////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Meal List</h1>
      <Link to="/new"><button style={button}>Create New Meal</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost 
        posts={posts}
        edit={getTargetMeal}
        deleteMeal={deleteMeal}
        />}/>
        <Route path="/new" element={<Form
          initialMeal={nullMeal}
          handleSubmit={addMeals}
          buttonLabel="Create Meal"
        />}/>
        <Route path="/edit" element={<Form
          initialMeal={targetMeal}
          handleSubmit={updateMeal}
          buttonLabel="Update Meal"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
