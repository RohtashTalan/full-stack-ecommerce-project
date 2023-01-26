import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Products from "./Components/Products";
import Login from "./Components/Login";

function App() {

  return (<>

  <Header />

  <main className="flex gap-4 my-6">
    <Login />
    <Aside/>
    <Products/>
  </main>
   <div className="text-3xl font-bold underline text-red-600">


<h1>Ecommerce App</h1>
</div>
  </>
   
  );
}

export default App;
