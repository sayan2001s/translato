import axios from "axios";
import toast from "react-hot-toast";

const processLogin = async (email, password) => {
    toast.loading('Logging in...');
    const url = "http://localhost:6969";
    if (email === '' || password === '') {
        toast.dismiss();
        toast.error('Email and password are required');
        return 0;
    }
    try {
        const { data } = await axios.post(url + '/auth/users/login',
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (data.message) {
            localStorage.setItem("token", data.token);
            toast.dismiss();
            window.location.reload()
            toast.success(data.message);
            return 1;
        }
        if (data.error) {
            if (data.error === "Bad credentials") {
                toast.dismiss();
                toast.error("Invalid email or password");
            } else {
                toast.dismiss();
                toast.error("User not exist! Please sign up first!");
            }
            return 0;
        }
    }
    catch (error) {
        toast.dismiss();
        toast.error("Error logging in");
        return 0;
    }

}
export default processLogin;