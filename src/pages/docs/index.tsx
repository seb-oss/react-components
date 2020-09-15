import React from "react";
import { navigateTo } from "gatsby";

const Docs: React.FC = React.memo(() => {
    React.useEffect(() => {
        navigateTo("/docs/getting-started");
    }, []);
    return null;
});

export default Docs;
