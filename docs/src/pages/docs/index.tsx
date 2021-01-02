import React from "react";
import { navigate } from "gatsby";

const Docs: React.FC = React.memo(() => {
    React.useEffect(() => {
        navigate("/docs/getting-started");
    }, []);
    return null;
});

export default Docs;
