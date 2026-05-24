
import { Link,NavLink } from "react-router-dom";
import "../style/Home.css";

function Home() {
const token=localStorage.getItem("token")

    return (
        <div className="home-container">

            {/* Hero Section */}
            <section className="hero-section">

                <h1>Manage Your Daily Tasks Easily</h1>

                <p>
                    Organize your work, track progress,
                    and improve productivity with our ToDo App.
                </p>

                <div className="hero-btn">

                   {token && <Link to="/add-task">
                        <button>Add Task</button>
                    </Link>}

                   {token && <Link to="/all-task">
                        <button>View Tasks</button>
                    </Link>}
                     
                   {!token && <NavLink to="/sign-up">
                        <button>Sign Up</button>
                    </NavLink>}

                     {!token && <NavLink to="/login">
                        <button>Login</button>
                    </NavLink>}

                </div>

            </section>

            {/* Features */}
            <section className="feature-section">

                <div className="feature-card">
                    <h2>Easy Management</h2>
                    <p>Add and manage tasks quickly.</p>
                </div>

                <div className="feature-card">
                    <h2>Track Progress</h2>
                    <p>Mark tasks completed anytime.</p>
                </div>

                <div className="feature-card">
                    <h2>Secure Login</h2>
                    <p>Your tasks stay protected.</p>
                </div>

            </section>

            {/* Stats */}
            <section className="stats-section">

                <div className="stat-card">
                    <h1>50+</h1>
                    <p>Tasks Completed</p>
                </div>

                <div className="stat-card">
                    <h1>20+</h1>
                    <p>Active Users</p>
                </div>

                <div className="stat-card">
                    <h1>100%</h1>
                    <p>Productivity</p>
                </div>

            </section>

            {/* Footer */}
            <footer className="footer">

                <p>
                    © 2026 ToDo App | Built with React & MongoDB
                </p>

            </footer>

        </div>
    );
}

export default Home;