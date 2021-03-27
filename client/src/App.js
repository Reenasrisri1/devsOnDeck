import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
import Register from './components/Register';
import Footer from './components/Footer';
import Login from './components/Login';
import OrgDashboard from './components/OrgDashboard';
import DevDashboard from './components/DevDashboard';
import Dashboard from './components/Dashboard';
import PositionNew from './components/PositionNew';
import SkillsUpdate from './components/SkillsUpdate';
import FrameworkUpdate from './components/FrameworkUpdate';
import Logout from './components/Logout';
function App() {
  const NotFound = () => {
    return <div>Route Not Found</div>;
  };
  return (
    <div className="App">
      
      <Router>
        <Register path="/:usr/register" />
        <Login path="/:usr/login" />
        <OrgDashboard path="/orgs/dashboard" />
        <DevDashboard path="/devs/dashboard" />
        <SkillsUpdate path="/devs/skills/languages" />
        <FrameworkUpdate path="/devs/skills/frameworks" />
        <Dashboard path="/orgs/jobs/:posId" />
        <PositionNew path="/orgs/jobs/new" />
        <Logout path="/logout" />
        <NotFound default />
      </Router>
      <Footer/>
    </div> 
  );
}

export default App;
