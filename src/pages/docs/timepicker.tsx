import React from "react";
import Docs from "components/Docs";
import { Timepicker, TimepickerDayperiodTypes, TimepickerValue } from "@sebgroup/react-components/Timepicker";

const TimepickerPage: React.FC = () => {
    const importString: string = require("!raw-loader!@sebgroup/react-components/Timepicker/Timepicker");
    const [value, setValue] = React.useState<TimepickerValue>({ hours: 11, minutes: 11, dayperiod: TimepickerDayperiodTypes.AM });
    const code: string = `<Timepicker name="myTimepicker" value={timerpickerValueObj} onChange={(newValue: TimepickerValue) => { this.setState({
        timerpickerValue: { ...newValue } }); }} />`;

    return <Docs mainFile={importString} example={<Timepicker name="myTimepicker" value={value} onChange={(newValue: TimepickerValue) => setValue(newValue)} />} code={code} />;
};

export default TimepickerPage;
