import React from "react";
import Docs from "@common/Docs";
import { Collapse } from "@sebgroup/react-components/Collapse";
import { Button } from "@sebgroup/react-components/Button";

const importString: string = require("!raw-loader!@sebgroup/react-components/Collapse/Collapse");
const code: string = `<Collapse toggle={toggle}>text</Collapse>`;

const CollapsePage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(true);

    return (
        <Docs
            mainFile={importString}
            example={
                <Collapse toggle={toggle}>
                    <p>Aut perferendis et. Et necessitatibus aliquid sit. Id illum minus qui atque autem. Qui dolorem amet beatae quasi. Sunt sunt id repellendus rerum.</p>
                </Collapse>
            }
            code={code}
            controls={
                <Button size="sm" onClick={() => setToggle(!toggle)}>
                    Toggle collapse
                </Button>
            }
        />
    );
};

export default CollapsePage;
