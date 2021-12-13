import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    ///////////////////////////
    // Style Objects
    ///////////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "50%",
    };

    return (
        <div style={div}>
            <Link to={`/post/${post.id}`}>
                <h1>{post.day}</h1>
            </Link>
            <h2>{post.meal}</h2>
            <h2>{post.name}</h2>
        </div>
    );
};

export default Post;