import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./pages/home/Home.page";
import { PostLoginHome } from "./pages/home-postlogin/Homepostlogin.page";
import { MainLayout } from "./pages/Main.layout";
import { SidebarContextProvider } from "./context/SidebarContext/SidebarContextProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SidebarContextProvider>
        <MainLayout />
      </SidebarContextProvider>
    ),
    children: [
      {
        path: "",
        element: <PostLoginHome />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
