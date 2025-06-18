import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    const navHome = () => {
        navigate('/');
    }

    return (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'red', fontSize: '5rem', textAlign: 'center' }}>404: Page Not Found</h1>
            <p className="mt-20 text-3xl">Page Not Found</p>
            <img src="https://media.giphy.com/media/ehPjfun4uTT4vFS98C/giphy.gif" alt="Ther is nothing here" width={250} />
            <Button className="mt-32" onClick={navHome}>Go Back Home</Button>
        </div>
    );
};


export default ErrorPage