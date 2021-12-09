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
        width: "80%",
    };

    return (
        <div style={div}>
            <Link to={`/post/${post.id}`}>
                <h1>{post.days}</h1>
            </Link>
            <h2>{post.subject}</h2>
        </div>
    );
};

export default Post;