import './App.scss';
import NavBar from './NavBar';
import TaskOne from './tasks/TaskOne';
import TaskTwo from './tasks/TaskTwo';

function App() {
    return (
        <>

            <NavBar />
            <div className="App">
                <TaskOne />
                <TaskTwo />
            </div>
        </>
    );
}

export default App;
