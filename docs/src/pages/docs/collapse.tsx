import React from "react";
import Docs from "@common/Docs";
import { Collapse } from "@sebgroup/react-components/Collapse";
import { Button } from "@sebgroup/react-components/Button";

const importString: string = require("!raw-loader!@sebgroup/react-components/Collapse/Collapse");
const code: string = `<Collapse toggle={toggle}>content</Collapse>`;

const CollapsePage: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(true);

    return (
        <Docs
            mainFile={importString}
            example={
                <Collapse toggle={toggle}>
                    <p>Aut perferendis et. Et necessitatibus aliquid sit. Id illum minus qui atque autem. Qui dolorem amet beatae quasi. Sunt sunt id repellendus rerum.</p>
                    <p>Occaecati vel incidunt id sapiente facere ut itaque repudiandae. Unde numquam sunt totam et delectus. Sit et fugit fuga aut.</p>
                    <p>Sed amet ab. Aut vel ipsam dolore. Ut ratione consequatur autem id adipisci corrupti et nam. Labore rerum debitis nihil sit aut ut mollitia.</p>
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
