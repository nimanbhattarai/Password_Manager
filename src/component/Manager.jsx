import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPassword = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords);

    }

    useEffect(() => {
        getPassword()
    }, []);

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            passwordRef.current.type = "password";
            ref.current.src = "icons/eye.png";
        } else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text";
        }
    };

    const savePassword = async () => {
        if (form.site.length >= 1 && form.username.length >= 1 && form.password.length >= 1) {

            // If any such id exist in the db , delete it
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
             await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            setForm({ site: "", username: "", password: "" });
            toast('Password Saved!!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error('Fill the Detail', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
            toast('Password Deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const editPassword = (id) => {
        setForm({...passwordArray.filter(item => item.id === id)[0], id: id});
        setPasswordArray(passwordArray.filter(item => item.id !== id));

    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />

            <div className="absolute top-0 -z-10 h-screen w-screen bg-white "></div>
            <div className="lg:mycontainer p-12">
                <h1 className="text-2xl text-center">
                    <span className="text-green-700 text-2xl font-bold">&lt;</span>
                    <span className="text-2xl font-bold">Pass</span>
                    <span className="text-green-700 text-2xl font-bold">OP</span>
                    <span className="text-green-700 text-2xl font-bold">/&gt;</span>
                </h1>
                <p className="text-green-700 text-lg text-center">Your own Password Manager</p>

                <div className="text-black flex flex-col gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                                id="password"
                            />
                            <span className="absolute right-[5px] top-[2px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center border px-4 py-2 bg-green-500 rounded-full w-fit hover:bg-green-300 gap-2"
                    >
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                                <thead className="bg-green-800 text-white">
                                    <tr>
                                        <th className="py-2">Site</th>
                                        <th className="py-2">Username</th>
                                        <th className="py-2">Password</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-green-100">
                                    {passwordArray.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="py-2 border border-white text-center">
                                                    <div className="flex items-center justify-center">
                                                        <a href={item.site} target="_blank" rel="noopener noreferrer">
                                                            {item.site}
                                                        </a>
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(item.site)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 border border-white text-center">
                                                    <div className="flex items-center justify-center">
                                                        <span>{item.username}</span>
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(item.username)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-2 border border-white text-center">
                                                    <div className="flex items-center justify-center">
                                                        <span>{"*".repeat(item.password.length)}</span>
                                                        <div className="lordiconcopy size-7 cursor-pointer" onClick={() => copyText(item.password)}>
                                                            <lord-icon
                                                                style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                trigger="hover"
                                                            ></lord-icon>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="justify-center py-2 border border-white text-center">
                                                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px" }}
                                                        ></lord-icon>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
